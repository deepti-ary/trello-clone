const API = "http://127.0.0.1:8000";

export type List = {
  id: number;
  board_id: number;
  title: string;
  position: number;
};

/* GET lists for board */
export async function getLists(boardId: number): Promise<List[]> {
  const res = await fetch(`${API}/lists/board/${boardId}`);
  return res.json();
}

/* CREATE list */
export async function createList(board_id: number, title: string, position: number) {
  const res = await fetch(`${API}/lists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board_id, title, position }),
  });
  return res.json();
}

/* DELETE list */
export async function deleteList(listId: number) {
  await fetch(`${API}/lists/${listId}`, { method: "DELETE" });
}

/* REORDER lists */
export async function reorderLists(
  updates: { id: number; position: number }[]
) {
  await fetch(`${API}/lists/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updates }),
  });
}
