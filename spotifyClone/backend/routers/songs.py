from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models import Song, LikedSong
from schemas import SongOut, SongCreate

router = APIRouter(prefix="/songs", tags=["songs"])


@router.get("", response_model=list[SongOut])
async def get_songs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Song))
    songs = result.scalars().all()

    liked_result = await db.execute(select(LikedSong.song_id))
    liked_ids = {row for row in liked_result.scalars().all()}

    return [
        SongOut(
            id=s.id,
            title=s.title,
            artist=s.artist,
            album=s.album,
            duration=s.duration,
            cover_url=s.cover_url,
            is_liked=s.id in liked_ids,
        )
        for s in songs
    ]


@router.get("/{song_id}", response_model=SongOut)
async def get_song(song_id: int, db: AsyncSession = Depends(get_db)):
    song = await db.get(Song, song_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    liked = await db.execute(select(LikedSong).where(LikedSong.song_id == song_id))
    is_liked = liked.scalar_one_or_none() is not None

    return SongOut(
        id=song.id, title=song.title, artist=song.artist,
        album=song.album, duration=song.duration,
        cover_url=song.cover_url, is_liked=is_liked,
    )


@router.post("", response_model=SongOut, status_code=201)
async def create_song(payload: SongCreate, db: AsyncSession = Depends(get_db)):
    song = Song(**payload.model_dump())
    db.add(song)
    await db.commit()
    await db.refresh(song)
    return SongOut(**song.__dict__, is_liked=False)


@router.delete("/{song_id}", status_code=204)
async def delete_song(song_id: int, db: AsyncSession = Depends(get_db)):
    song = await db.get(Song, song_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")
    await db.delete(song)
    await db.commit()
