def test_create_board(client):
    response = client.post(
        "/boards/",
        json={"title": "Test Board"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Board"
    assert "id" in data


def test_get_boards(client):
    response = client.get("/boards/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) >= 1
