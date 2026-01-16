import { Board } from "@/types/board";

const BASE = "http://127.0.0.1:8000";

export async function getBoards(): Promise<Board[]> {
  const res = await fetch(`${BASE}/boards/`);
  if (!res.ok) throw new Error("Failed to fetch boards");
  return res.json();
}

export async function createBoard(title: string): Promise<Board> {
  const res = await fetch(`${BASE}/boards/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error("Failed to create board");
  return res.json();
}
