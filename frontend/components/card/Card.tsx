"use client";

import { useState } from "react";
import CardModal from "./CardModal";
import { CardData } from "@/types/card";

type Props = {
  card: CardData; // ✅ REQUIRED
};

export default function Card({ card }: Props) {
  const [open, setOpen] = useState(false);

  if (!card) return null; // 🛑 safety guard

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-md p-2 shadow-sm cursor-pointer hover:bg-gray-50"
      >
        {/* LABELS */}
        {card.labels.length > 0 && (
          <div className="flex gap-1 mb-1">
            {card.labels.map((label) => (
              <span
                key={label}
                className="h-2 w-8 rounded bg-green-500"
              />
            ))}
          </div>
        )}

        <p className="text-sm text-gray-800">{card.title}</p>
      </div>

      {open && (
        <CardModal
          card={card}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
