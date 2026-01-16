"use client";

import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import Card from "@/components/card/Card";
import { getCardsByList, createCard } from "@/lib/cardApi";
import { CardData } from "@/types/card";

export default function ListColumn({
  list,
  onDelete,
}: {
  list: { id: number; title: string };
  onDelete: (id: number) => void;
}) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  /* ---------- LOAD CARDS ---------- */
  useEffect(() => {
    getCardsByList(list.id)
      .then(setCards)
      .catch(() => setCards([]));
  }, [list.id]);

  /* ---------- ADD CARD ---------- */
  const addCard = async () => {
    if (!title.trim()) return;

    const newCard: CardData = await createCard({
      list_id: list.id,
      title,
      position: cards.length,
    });

    setCards((prev) => [...prev, newCard]);
    setTitle("");
    setAdding(false);
  };

  return (
    <div className="min-w-[260px] bg-white rounded-lg p-3 shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sm">{list.title}</h3>
        <button onClick={() => onDelete(list.id)}>
          <CloseIcon fontSize="small" />
        </button>
      </div>

      {/* CARDS */}
      <div className="flex flex-col gap-2 mb-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {/* ADD CARD */}
      {adding ? (
        <div>
          <textarea
            className="w-full border rounded p-2 text-sm mb-2 resize-none"
            rows={2}
            placeholder="Enter a title for this card…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <div className="flex gap-2">
            <button
              onClick={addCard}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Add card
            </button>
            <button
              onClick={() => setAdding(false)}
              className="text-sm text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
        >
          <AddIcon fontSize="small" />
          Add a card
        </button>
      )}
    </div>
  );
}
