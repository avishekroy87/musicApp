import pytest

PLAYLIST_PAYLOAD = {
    "name": "My Playlist",
    "cover_url": "https://example.com/playlist.jpg",
}

SONG_PAYLOAD = {
    "title": "Track One",
    "artist": "Artist",
    "album": "Album",
    "duration": "3:15",
    "cover_url": "https://example.com/cover.jpg",
}


async def test_get_playlists_empty(client):
    res = await client.get("/playlists")
    assert res.status_code == 200
    assert res.json() == []


async def test_create_playlist(client):
    res = await client.post("/playlists", json=PLAYLIST_PAYLOAD)
    assert res.status_code == 201
    data = res.json()
    assert data["name"] == "My Playlist"
    assert data["song_count"] == 0
    assert data["songs"] == []
    assert "id" in data


async def test_get_playlist_by_id(client):
    playlist_id = (await client.post("/playlists", json=PLAYLIST_PAYLOAD)).json()["id"]
    res = await client.get(f"/playlists/{playlist_id}")
    assert res.status_code == 200
    assert res.json()["id"] == playlist_id


async def test_get_playlist_not_found(client):
    res = await client.get("/playlists/9999")
    assert res.status_code == 404


async def test_add_song_to_playlist(client):
    playlist_id = (await client.post("/playlists", json=PLAYLIST_PAYLOAD)).json()["id"]
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]

    res = await client.post(f"/playlists/{playlist_id}/songs/{song_id}")
    assert res.status_code == 204

    playlist = (await client.get(f"/playlists/{playlist_id}")).json()
    assert playlist["song_count"] == 1
    assert playlist["songs"][0]["id"] == song_id


async def test_add_same_song_twice_is_idempotent(client):
    playlist_id = (await client.post("/playlists", json=PLAYLIST_PAYLOAD)).json()["id"]
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]

    await client.post(f"/playlists/{playlist_id}/songs/{song_id}")
    await client.post(f"/playlists/{playlist_id}/songs/{song_id}")

    playlist = (await client.get(f"/playlists/{playlist_id}")).json()
    assert playlist["song_count"] == 1


async def test_remove_song_from_playlist(client):
    playlist_id = (await client.post("/playlists", json=PLAYLIST_PAYLOAD)).json()["id"]
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]

    await client.post(f"/playlists/{playlist_id}/songs/{song_id}")
    res = await client.delete(f"/playlists/{playlist_id}/songs/{song_id}")
    assert res.status_code == 204

    playlist = (await client.get(f"/playlists/{playlist_id}")).json()
    assert playlist["song_count"] == 0


async def test_delete_playlist(client):
    playlist_id = (await client.post("/playlists", json=PLAYLIST_PAYLOAD)).json()["id"]

    del_res = await client.delete(f"/playlists/{playlist_id}")
    assert del_res.status_code == 204

    get_res = await client.get(f"/playlists/{playlist_id}")
    assert get_res.status_code == 404


async def test_delete_playlist_not_found(client):
    res = await client.delete("/playlists/9999")
    assert res.status_code == 404


async def test_add_song_to_missing_playlist(client):
    song_id = (await client.post("/songs", json=SONG_PAYLOAD)).json()["id"]
    res = await client.post(f"/playlists/9999/songs/{song_id}")
    assert res.status_code == 404


async def test_add_missing_song_to_playlist(client):
    playlist_id = (await client.post("/playlists", json=PLAYLIST_PAYLOAD)).json()["id"]
    res = await client.post(f"/playlists/{playlist_id}/songs/9999")
    assert res.status_code == 404
