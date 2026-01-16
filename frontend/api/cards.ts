import { Card } from "@/types/card";

const BASE = "http://127.0.0.1:8000";

export async function getCards(listId: number): Promise<Card[]> {
  const res = await fetch(`${BASE}/cards/list/${listId}`);
  if (!res.ok) throw new Error("Failed to fetch cards");
  return res.json();
}

export async function createCard(
  listId: number,
  title: string,
  position: number
): Promise<Card> {
  const res = await fetch(`${BASE}/cards/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ list_id: listId, title, position }),
  });

  if (!res.ok) throw new Error("Failed to create card");
  return res.json();
}

export async function moveCard(payload: {
  card_id: number;
  source_list_id: number;
  target_list_id: number;
  target_position: number;
}) {
  return fetch(`${BASE}/cards/move`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
