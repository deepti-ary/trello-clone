def test_create_list(client):
    response = client.post(
        "/lists/",
        json={
            "title": "Todo",
            "position": 1,
            "board_id": 1
        }
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Todo"


def test_reorder_lists(client):
    response = client.patch(
        "/lists/reorder",
        json={
            "board_id": 1,
            "ordered_list_ids": [1]
        }
    )
    assert response.status_code == 200
