from sqlalchemy import String, Integer, Boolean, ForeignKey, Table, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


playlist_songs = Table(
    "playlist_songs",
    Base.metadata,
    Column("playlist_id", Integer, ForeignKey("playlists.id", ondelete="CASCADE"), primary_key=True),
    Column("song_id", Integer, ForeignKey("songs.id", ondelete="CASCADE"), primary_key=True),
)


class Song(Base):
    __tablename__ = "songs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    artist: Mapped[str] = mapped_column(String(255), nullable=False)
    album: Mapped[str] = mapped_column(String(255), nullable=False)
    duration: Mapped[str] = mapped_column(String(10), nullable=False)
    cover_url: Mapped[str] = mapped_column(String(500), nullable=False)

    liked: Mapped[list["LikedSong"]] = relationship("LikedSong", back_populates="song", cascade="all, delete")
    playlists: Mapped[list["Playlist"]] = relationship("Playlist", secondary=playlist_songs, back_populates="songs")


class Playlist(Base):
    __tablename__ = "playlists"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    cover_url: Mapped[str] = mapped_column(String(500), nullable=False)

    songs: Mapped[list[Song]] = relationship("Song", secondary=playlist_songs, back_populates="playlists")


class LikedSong(Base):
    __tablename__ = "liked_songs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    song_id: Mapped[int] = mapped_column(Integer, ForeignKey("songs.id", ondelete="CASCADE"), nullable=False, unique=True)

    song: Mapped[Song] = relationship("Song", back_populates="liked")
