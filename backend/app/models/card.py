from sqlalchemy import Column, Integer, String, Text, Date, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base
from app.models.association import card_members, card_labels

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True)
    list_id = Column(Integer, ForeignKey("lists.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    position = Column(Integer, nullable=False)
    due_date = Column(Date)
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    list = relationship("List", back_populates="cards")
    members = relationship("Member", secondary=card_members, back_populates="cards")
    labels = relationship("Label", secondary=card_labels, back_populates="cards")
    checklists = relationship("Checklist", back_populates="card", cascade="all, delete")
