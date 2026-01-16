from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class Checklist(Base):
    __tablename__ = "checklists"

    id = Column(Integer, primary_key=True)
    card_id = Column(Integer, ForeignKey("cards.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)

    card = relationship("Card", back_populates="checklists")
    items = relationship("ChecklistItem", back_populates="checklist", cascade="all, delete")

class ChecklistItem(Base):
    __tablename__ = "checklist_items"

    id = Column(Integer, primary_key=True)
    checklist_id = Column(Integer, ForeignKey("checklists.id", ondelete="CASCADE"))
    content = Column(String(255), nullable=False)
    is_completed = Column(Boolean, default=False)

    checklist = relationship("Checklist", back_populates="items")
