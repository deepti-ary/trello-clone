from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db import Base
from app.models.association import card_members

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)

    cards = relationship("Card", secondary=card_members, back_populates="members")
