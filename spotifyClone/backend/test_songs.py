import pytest


SONG_PAYLOAD = {
    "title": "Test Song",
    "artist": "Test Artist",
    "album": "Test Album",
    "duration": "3:30",
    "cover_url": "https://example.com/cover.jpg",
}


async def test_get_songs_empty(client):
    res = await client.get("/songs")
    assert res.status_code == 200
    assert res.json() == []


async def test_create_song(client):
    res = await client.post("/songs", json=SONG_PAYLOAD)
    assert res.status_code == 201
    data = res.json()
    assert data["title"] == "Test Song"
    assert data["artist"] == "Test Artist"
    assert data["is_liked"] is False
    assert "id" in data


async def test_get_song_by_id(client):
    create_res = await client.post("/songs", json=SONG_PAYLOAD)
    song_id = create_res.json()["id"]

    res = await client.get(f"/songs/{song_id}")
    assert res.status_code == 200
    assert res.json()["id"] == song_id


async def test_get_song_not_found(client):
    res = await client.get("/songs/9999")
    assert res.status_code == 404


async def test_get_songs_returns_list(client):
    await client.post("/songs", json=SONG_PAYLOAD)
    await client.post("/songs", json={**SONG_PAYLOAD, "title": "Another Song"})

    res = await client.get("/songs")
    assert res.status_code == 200
    assert len(res.json()) == 2


async def test_delete_song(client):
    create_res = await client.post("/songs", json=SONG_PAYLOAD)
    song_id = create_res.json()["id"]

    del_res = await client.delete(f"/songs/{song_id}")
    assert del_res.status_code == 204

    get_res = await client.get(f"/songs/{song_id}")
    assert get_res.status_code == 404


async def test_delete_song_not_found(client):
    res = await client.delete("/songs/9999")
    assert res.status_code == 404
