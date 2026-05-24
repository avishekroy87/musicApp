from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from database import get_db
from models import LikedSong, Song
from schemas import SongOut, MessageOut

router = APIRouter(prefix="/liked", tags=["liked"])


@router.get("", response_model=list[SongOut])
async def get_liked_songs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(LikedSong).options(selectinload(LikedSong.song))
    )
    liked = result.scalars().all()
    return [
        SongOut(
            id=lk.song.id, title=lk.song.title, artist=lk.song.artist,
            album=lk.song.album, duration=lk.song.duration,
            cover_url=lk.song.cover_url, is_liked=True
        )
        for lk in liked
    ]


@router.post("/{song_id}", response_model=MessageOut)
async def like_song(song_id: int, db: AsyncSession = Depends(get_db)):
    song = await db.get(Song, song_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    existing = await db.execute(select(LikedSong).where(LikedSong.song_id == song_id))
    if existing.scalar_one_or_none():
        return MessageOut(message="Already liked")

    liked = LikedSong(song_id=song_id)
    db.add(liked)
    await db.commit()
    return MessageOut(message="Song liked")


@router.delete("/{song_id}", response_model=MessageOut)
async def unlike_song(song_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LikedSong).where(LikedSong.song_id == song_id))
    liked = result.scalar_one_or_none()
    if not liked:
        raise HTTPException(status_code=404, detail="Song not in liked list")
    await db.delete(liked)
    await db.commit()
    return MessageOut(message="Song unliked")
