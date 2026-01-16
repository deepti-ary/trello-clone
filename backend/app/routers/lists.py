from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.list import ListReorder
from app.db import get_db
from app.models import List as ListModel, Board
from app.schemas.list import ListCreate, ListRead

router = APIRouter(prefix="/lists", tags=["Lists"])


@router.get("/board/{board_id}", response_model=List[ListRead])
def get_lists(board_id: int, db: Session = Depends(get_db)):
    return (
        db.query(ListModel)
        .filter(ListModel.board_id == board_id)
        .order_by(ListModel.position)
        .all()
    )


@router.post("/", response_model=ListRead)
def create_list(list_data: ListCreate, db: Session = Depends(get_db)):
    board = db.query(Board).filter(Board.id == list_data.board_id).first()
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")

    new_list = ListModel(
        title=list_data.title,
        position=list_data.position,
        board_id=list_data.board_id
    )

    db.add(new_list)
    db.commit()
    db.refresh(new_list)
    return new_list

@router.patch("/reorder")
def reorder_lists(data: ListReorder, db: Session = Depends(get_db)):
    lists = (
        db.query(ListModel)
        .filter(ListModel.board_id == data.board_id)
        .all()
    )

    list_map = {lst.id: lst for lst in lists}

    for position, list_id in enumerate(data.ordered_list_ids, start=1):
        if list_id in list_map:
            list_map[list_id].position = position

    db.commit()
    return {"status": "lists reordered"}
