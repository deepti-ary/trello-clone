from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional
from typing import List

class CardReorder(BaseModel):
    list_id: int
    ordered_card_ids: List[int]

class CardBase(BaseModel):
    title: str
    description: Optional[str] = None
    position: int
    due_date: Optional[date] = None

class CardCreate(CardBase):
    list_id: int

class CardRead(CardBase):
    id: int
    is_archived: bool
    created_at: datetime

    class Config:
        orm_mode = True

class CardMove(BaseModel):
    card_id: int
    source_list_id: int
    target_list_id: int
    target_position: int
