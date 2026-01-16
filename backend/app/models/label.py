from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db import Base
from app.models.association import card_labels

class Label(Base):
    __tablename__ = "labels"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    color = Column(String(20), nullable=False)

    cards = relationship("Card", secondary=card_labels, back_populates="labels")
