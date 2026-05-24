"""Run this once to populate the database with initial data."""
import asyncio
from database import AsyncSessionLocal, init_db
from models import Song, Playlist


SONGS = [
    {"title": "Blinding Lights", "artist": "The Weeknd", "album": "After Hours", "duration": "3:20", "cover_url": "https://picsum.photos/seed/blinding/300/300"},
    {"title": "Shape of You", "artist": "Ed Sheeran", "album": "Divide", "duration": "3:53", "cover_url": "https://picsum.photos/seed/shapeof/300/300"},
    {"title": "Levitating", "artist": "Dua Lipa", "album": "Future Nostalgia", "duration": "3:23", "cover_url": "https://picsum.photos/seed/levitat/300/300"},
    {"title": "Stay", "artist": "The Kid LAROI", "album": "F*ck Love", "duration": "2:21", "cover_url": "https://picsum.photos/seed/staysong/300/300"},
    {"title": "Peaches", "artist": "Justin Bieber", "album": "Justice", "duration": "3:18", "cover_url": "https://picsum.photos/seed/peaches1/300/300"},
    {"title": "Good 4 U", "artist": "Olivia Rodrigo", "album": "SOUR", "duration": "2:58", "cover_url": "https://picsum.photos/seed/good4u/300/300"},
    {"title": "Montero", "artist": "Lil Nas X", "album": "Montero", "duration": "2:17", "cover_url": "https://picsum.photos/seed/montero1/300/300"},
    {"title": "Kiss Me More", "artist": "Doja Cat", "album": "Planet Her", "duration": "3:38", "cover_url": "https://picsum.photos/seed/kissme1/300/300"},
]

PLAYLISTS = [
    {"name": "Chill Vibes", "cover_url": "https://picsum.photos/seed/chill1/300/300"},
    {"name": "Workout Hits", "cover_url": "https://picsum.photos/seed/workout2/300/300"},
    {"name": "Late Night Drive", "cover_url": "https://picsum.photos/seed/latenight3/300/300"},
    {"name": "Top Charts", "cover_url": "https://picsum.photos/seed/topcharts4/300/300"},
    {"name": "Indie Gems", "cover_url": "https://picsum.photos/seed/indiegems5/300/300"},
    {"name": "Throwback Jams", "cover_url": "https://picsum.photos/seed/throwback6/300/300"},
]


async def seed():
    await init_db()
    async with AsyncSessionLocal() as db:
        from sqlalchemy import select

        existing = await db.execute(select(Song))
        if existing.scalars().first():
            print("Database already seeded. Skipping.")
            return

        songs = [Song(**s) for s in SONGS]
        db.add_all(songs)
        await db.flush()

        playlists = []
        for i, p in enumerate(PLAYLISTS):
            pl = Playlist(**p)
            pl.songs = songs[i * 1: i * 1 + 3]
            playlists.append(pl)

        db.add_all(playlists)
        await db.commit()
        print(f"Seeded {len(songs)} songs and {len(playlists)} playlists.")


if __name__ == "__main__":
    asyncio.run(seed())
