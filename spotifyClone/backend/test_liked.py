import pytest

SONG_PAYLOAD = {
    "title": "Liked Song",
    "artist": "Artist",
    "album": "Album",
    "duration": "4:00",
    "cover_url": "https://example.com/cover.jpg",
}


async def test_get_liked_empty(client):
    res = await client.get("/liked")
    assert res.status_code == 200
    assert res.json() == []


async def test_like_song(client):
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]
    res = await client.post(f"/liked/{song_id}")
    assert res.status_code == 200
    assert res.json()["message"] == "Song liked"


async def test_like_song_appears_in_liked_list(client):
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]
    await client.post(f"/liked/{song_id}")

    res = await client.get("/liked")
    assert res.status_code == 200
    liked = res.json()
    assert len(liked) == 1
    assert liked[0]["id"] == song_id
    assert liked[0]["is_liked"] is True


async def test_like_song_marks_is_liked_in_songs(client):
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]
    await client.post(f"/liked/{song_id}")

    songs = (await client.get("/songs")).json()
    assert songs[0]["is_liked"] is True


async def test_like_song_already_liked(client):
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]
    await client.post(f"/liked/{song_id}")
    res = await client.post(f"/liked/{song_id}")
    assert res.status_code == 200
    assert res.json()["message"] == "Already liked"


async def test_unlike_song(client):
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]
    await client.post(f"/liked/{song_id}")

    res = await client.delete(f"/liked/{song_id}")
    assert res.status_code == 200
    assert res.json()["message"] == "Song unliked"

    liked = (await client.get("/liked")).json()
    assert liked == []


async def test_unlike_song_not_in_liked(client):
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]
    res = await client.delete(f"/liked/{song_id}")
    assert res.status_code == 404


async def test_like_nonexistent_song(client):
    res = await client.post("/liked/9999")
    assert res.status_code == 404
