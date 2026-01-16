from pydantic import BaseModel
from typing import List

class ChecklistItemRead(BaseModel):
    id: int
    content: str
    is_completed: bool

    class Config:
        orm_mode = True

class ChecklistRead(BaseModel):
    id: int
    title: str
    items: List[ChecklistItemRead]

    class Config:
        orm_mode = True
