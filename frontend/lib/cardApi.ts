const API = "http://127.0.0.1:8000";

export async function getCardsByList(listId: number) {
  const res = await fetch(`${API}/cards/list/${listId}`);
  if (!res.ok) throw new Error("Failed to fetch cards");
  return res.json();
}

export async function createCard(data: {
  list_id: number;
  title: string;
  position: number;
}) {
  const res = await fetch(`${API}/cards/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create card");
  return res.json();
}
