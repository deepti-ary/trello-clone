from pydantic import BaseModel

class MemberRead(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True
