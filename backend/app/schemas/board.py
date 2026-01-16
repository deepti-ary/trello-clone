from pydantic import BaseModel
from datetime import datetime
from typing import List

class BoardBase(BaseModel):
    title: str

class BoardCreate(BoardBase):
    pass

class BoardRead(BoardBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
