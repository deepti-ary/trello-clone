from sqlalchemy import Table, Column, Integer, ForeignKey
from app.db import Base

card_members = Table(
    "card_members",
    Base.metadata,
    Column("card_id", Integer, ForeignKey("cards.id", ondelete="CASCADE"), primary_key=True),
    Column("member_id", Integer, ForeignKey("members.id", ondelete="CASCADE"), primary_key=True),
)

card_labels = Table(
    "card_labels",
    Base.metadata,
    Column("card_id", Integer, ForeignKey("cards.id", ondelete="CASCADE"), primary_key=True),
    Column("label_id", Integer, ForeignKey("labels.id", ondelete="CASCADE"), primary_key=True),
)
