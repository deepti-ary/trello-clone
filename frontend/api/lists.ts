import { List } from "@/types/list";

const BASE = "http://127.0.0.1:8000";

export async function getLists(boardId: number): Promise<List[]> {
  const res = await fetch(`${BASE}/lists/board/${boardId}`);
  if (!res.ok) throw new Error("Failed to fetch lists");
  return res.json();
}

export async function createList(
  boardId: number,
  title: string,
  position: number
): Promise<List> {
  const res = await fetch(`${BASE}/lists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board_id: boardId, title, position }),
  });

  if (!res.ok) throw new Error("Failed to create list");
  return res.json();
}

export async function reorderLists(
  boardId: number,
  orderedIds: number[]
) {
  return fetch(`${BASE}/lists/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board_id: boardId, ordered_ids: orderedIds }),
  });
}
