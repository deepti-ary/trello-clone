from pydantic import BaseModel

class LabelRead(BaseModel):
    id: int
    name: str
    color: str

    class Config:
        orm_mode = True
