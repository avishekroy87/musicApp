from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from database import get_db
from models import Playlist, Song, LikedSong, playlist_songs
from schemas import PlaylistOut, PlaylistCreate, SongOut

router = APIRouter(prefix="/playlists", tags=["playlists"])


@router.get("", response_model=list[PlaylistOut])
async def get_playlists(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Playlist).options(selectinload(Playlist.songs))
    )
    playlists = result.scalars().all()

    liked_result = await db.execute(select(LikedSong.song_id))
    liked_ids = {row for row in liked_result.scalars().all()}

    return [
        PlaylistOut(
            id=pl.id,
            name=pl.name,
            cover_url=pl.cover_url,
            song_count=len(pl.songs),
            songs=[
                SongOut(
                    id=s.id, title=s.title, artist=s.artist,
                    album=s.album, duration=s.duration,
                    cover_url=s.cover_url, is_liked=s.id in liked_ids
                )
                for s in pl.songs
            ],
        )
        for pl in playlists
    ]


@router.get("/{playlist_id}", response_model=PlaylistOut)
async def get_playlist(playlist_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Playlist).where(Playlist.id == playlist_id).options(selectinload(Playlist.songs))
    )
    pl = result.scalar_one_or_none()
    if not pl:
        raise HTTPException(status_code=404, detail="Playlist not found")

    liked_result = await db.execute(select(LikedSong.song_id))
    liked_ids = {row for row in liked_result.scalars().all()}

    return PlaylistOut(
        id=pl.id, name=pl.name, cover_url=pl.cover_url,
        song_count=len(pl.songs),
        songs=[
            SongOut(
                id=s.id, title=s.title, artist=s.artist,
                album=s.album, duration=s.duration,
                cover_url=s.cover_url, is_liked=s.id in liked_ids
            )
            for s in pl.songs
        ],
    )


@router.post("", response_model=PlaylistOut, status_code=201)
async def create_playlist(payload: PlaylistCreate, db: AsyncSession = Depends(get_db)):
    pl = Playlist(**payload.model_dump())
    db.add(pl)
    await db.commit()
    await db.refresh(pl)
    return PlaylistOut(id=pl.id, name=pl.name, cover_url=pl.cover_url, song_count=0, songs=[])


@router.post("/{playlist_id}/songs/{song_id}", status_code=204)
async def add_song_to_playlist(playlist_id: int, song_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Playlist).where(Playlist.id == playlist_id).options(selectinload(Playlist.songs))
    )
    pl = result.scalar_one_or_none()
    if not pl:
        raise HTTPException(status_code=404, detail="Playlist not found")
    song = await db.get(Song, song_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")
    if song not in pl.songs:
        pl.songs.append(song)
        await db.commit()


@router.delete("/{playlist_id}/songs/{song_id}", status_code=204)
async def remove_song_from_playlist(playlist_id: int, song_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Playlist).where(Playlist.id == playlist_id).options(selectinload(Playlist.songs))
    )
    pl = result.scalar_one_or_none()
    if not pl:
        raise HTTPException(status_code=404, detail="Playlist not found")
    song = await db.get(Song, song_id)
    if song and song in pl.songs:
        pl.songs.remove(song)
        await db.commit()


@router.delete("/{playlist_id}", status_code=204)
async def delete_playlist(playlist_id: int, db: AsyncSession = Depends(get_db)):
    pl = await db.get(Playlist, playlist_id)
    if not pl:
        raise HTTPException(status_code=404, detail="Playlist not found")
    await db.delete(pl)
    await db.commit()
