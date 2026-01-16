def test_create_card(client):
    # 1️⃣ Create board
    board = client.post("/boards/", json={"title": "Test Board"}).json()

    # 2️⃣ Create list
    list_resp = client.post(
        "/lists/",
        json={
            "title": "Todo",
            "position": 1,
            "board_id": board["id"]
        }
    ).json()

    # 3️⃣ Create card
    response = client.post(
        "/cards/",
        json={
            "title": "Test Card",
            "position": 1,
            "list_id": list_resp["id"]
        }
    )

    assert response.status_code == 200
    assert response.json()["title"] == "Test Card"


def test_move_card(client):
    # 1️⃣ Create board
    board = client.post("/boards/", json={"title": "Move Board"}).json()

    # 2️⃣ Create two lists
    list1 = client.post(
        "/lists/",
        json={"title": "Todo", "position": 1, "board_id": board["id"]}
    ).json()

    list2 = client.post(
        "/lists/",
        json={"title": "Done", "position": 2, "board_id": board["id"]}
    ).json()

    # 3️⃣ Create card in list1
    card = client.post(
        "/cards/",
        json={
            "title": "Movable Card",
            "position": 1,
            "list_id": list1["id"]
        }
    ).json()

    # 4️⃣ Move card to list2
    response = client.patch(
        "/cards/move",
        json={
            "card_id": card["id"],
            "source_list_id": list1["id"],
            "target_list_id": list2["id"],
            "target_position": 1
        }
    )

    assert response.status_code == 200
