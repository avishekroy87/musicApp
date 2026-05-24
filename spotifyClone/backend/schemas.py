from pydantic import BaseModel
from typing import Optional


class SongBase(BaseModel):
    title: str
    artist: str
    album: str
    duration: str
    cover_url: str


class SongCreate(SongBase):
    pass


class SongOut(SongBase):
    id: int
    is_liked: bool = False

    model_config = {"from_attributes": True}


class PlaylistBase(BaseModel):
    name: str
    cover_url: str


class PlaylistCreate(PlaylistBase):
    pass


class PlaylistOut(PlaylistBase):
    id: int
    song_count: int = 0
    songs: list[SongOut] = []

    model_config = {"from_attributes": True}


class LikedSongOut(BaseModel):
    song_id: int
    song: SongOut

    model_config = {"from_attributes": True}


class MessageOut(BaseModel):
    message: str
