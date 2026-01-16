from pydantic import BaseModel
from datetime import datetime
from typing import List

class ListBase(BaseModel):
    title: str
    position: int

class ListCreate(ListBase):
    board_id: int

class ListRead(ListBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ListReorder(BaseModel):
    board_id: int
    ordered_list_ids: List[int]