from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db import get_db
from app.models import Board
from app.schemas.board import BoardCreate, BoardRead

router = APIRouter(prefix="/boards", tags=["Boards"])


@router.get("/", response_model=List[BoardRead])
def get_boards(db: Session = Depends(get_db)):
    return db.query(Board).all()


@router.post("/", response_model=BoardRead)
def create_board(board: BoardCreate, db: Session = Depends(get_db)):
    new_board = Board(title=board.title)
    db.add(new_board)
    db.commit()
    db.refresh(new_board)
    return new_board
