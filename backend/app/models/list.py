from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class List(Base):
    __tablename__ = "lists"

    id = Column(Integer, primary_key=True)
    board_id = Column(Integer, ForeignKey("boards.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    position = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    board = relationship("Board", back_populates="lists")
    cards = relationship("Card", back_populates="list", cascade="all, delete")
