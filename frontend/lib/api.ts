const API = "http://127.0.0.1:8000";

export async function getBoards() {
  const res = await fetch(`${API}/boards/`);
  return res.json();
}

export async function createBoard(data: any) {
  const res = await fetch(`${API}/boards/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBoard(id: number) {
  await fetch(`${API}/boards/${id}`, {
    method: "DELETE",
  });
}

export async function getBoard(id: string | number) {
  const res = await fetch(`${API}/boards/${id}`);
  if (!res.ok) throw new Error("Board not found");
  return res.json();
}
