from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db import get_db
from app.models import Card, List as ListModel
from app.schemas.card import CardCreate, CardRead
from app.schemas.card import CardReorder

router = APIRouter(prefix="/cards", tags=["Cards"])

from app.schemas.card import CardMove

@router.patch("/move")
def move_card(data: CardMove, db: Session = Depends(get_db)):
    card = (
        db.query(Card)
        .filter(Card.id == data.card_id, Card.list_id == data.source_list_id)
        .first()
    )

    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    # Shift cards down in target list
    target_cards = (
        db.query(Card)
        .filter(Card.list_id == data.target_list_id)
        .order_by(Card.position)
        .all()
    )

    for c in target_cards:
        if c.position >= data.target_position:
            c.position += 1

    card.list_id = data.target_list_id
    card.position = data.target_position

    db.commit()
    return {"status": "card moved"}


@router.patch("/reorder")
def reorder_cards(data: CardReorder, db: Session = Depends(get_db)):
    cards = (
        db.query(Card)
        .filter(Card.list_id == data.list_id)
        .all()
    )

    card_map = {card.id: card for card in cards}

    for position, card_id in enumerate(data.ordered_card_ids, start=1):
        if card_id in card_map:
            card_map[card_id].position = position

    db.commit()
    return {"status": "cards reordered"}


@router.get("/list/{list_id}", response_model=List[CardRead])
def get_cards(list_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Card)
        .filter(Card.list_id == list_id)
        .order_by(Card.position)
        .all()
    )


@router.post("/", response_model=CardRead)
def create_card(card: CardCreate, db: Session = Depends(get_db)):
    list_obj = db.query(ListModel).filter(ListModel.id == card.list_id).first()
    if not list_obj:
        raise HTTPException(status_code=404, detail="List not found")

    new_card = Card(
        title=card.title,
        description=card.description,
        position=card.position,
        due_date=card.due_date,
        list_id=card.list_id
    )

    db.add(new_card)
    db.commit()
    db.refresh(new_card)
    return new_card
