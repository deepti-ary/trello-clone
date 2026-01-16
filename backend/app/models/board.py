from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class Board(Base):
    __tablename__ = "boards"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    lists = relationship("List", back_populates="board", cascade="all, delete")
