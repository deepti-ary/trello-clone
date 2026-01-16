"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

/* ---------- TYPES ---------- */
type User = {
  id: number;
  name: string;
};

type Theme = {
  id: string;
  name: string;
  image: string;
};

type Board = {
  id: number;
  title: string;
  theme: string;
  visibility: string;
};

/* ---------- CONSTANTS ---------- */
const THEMES: Theme[] = [
  { id: "blue", name: "Blue", image: "/trello/blue.jpeg" },
  { id: "dark", name: "Dark", image: "/trello/dark.jpeg" },
  { id: "green", name: "Green", image: "/trello/green.jpeg" },
  { id: "minimal", name: "Minimal", image: "/trello/minimal.jpeg" },
];

const API = "http://127.0.0.1:8000";

/* ---------- COMPONENT ---------- */
export default function HomePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [showModal, setShowModal] = useState(false);

  /* ---------- LOAD USER + THEME ---------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) setTheme(JSON.parse(savedTheme));
  }, []);

  /* ---------- LOAD BOARDS ---------- */
  useEffect(() => {
    fetch(`${API}/boards/`)
      .then((res) => res.json())
      .then(setBoards)
      .catch(() => setBoards([]));
  }, []);

  /* ---------- SELECT THEME ---------- */
  const selectTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("selectedTheme", JSON.stringify(t));
  };

  /* ---------- DELETE BOARD ---------- */
  const deleteBoard = async (id: number) => {
    await fetch(`${API}/boards/${id}`, { method: "DELETE" });
    setBoards((prev) => prev.filter((b) => b.id !== id));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user selected
      </div>
    );
  }

  return (
    <main
      className="min-h-screen transition-all"
      style={{
        backgroundImage: theme ? `url(${theme.image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* HEADER */}
      <header className="p-6">
        <h1 className="text-3xl font-bold text-white">
          Hello {user.name}!
        </h1>
      </header>

      {/* THEME SELECTOR */}
      <section className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Choose a theme
        </h2>

        <div className="flex gap-4">
          {THEMES.map((t) => (
            <div
              key={t.id}
              onClick={() => selectTheme(t)}
              className={`h-20 w-32 rounded-lg cursor-pointer border-2 ${
                theme?.id === t.id
                  ? "border-white"
                  : "border-transparent"
              }`}
              style={{
                backgroundImage: `url(${t.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </section>

      {/* BOARDS */}
      <section className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Your boards
        </h2>

        <div className="flex gap-4 flex-wrap">
          {/* CREATE BOARD */}
          <div
            onClick={() => setShowModal(true)}
            className="h-32 w-56 bg-white/80 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white"
          >
            + Create new board
          </div>

          {/* EXISTING BOARDS */}
          {boards.map((board) => (
            <div
              key={board.id}
              className="h-32 w-56 rounded-lg p-3 text-white relative cursor-pointer"
              style={{
                backgroundImage: `url(${board.theme})`,
                backgroundSize: "cover",
              }}
              onClick={() => {
  localStorage.setItem("currentBoard", JSON.stringify(board));
  router.push(`/boards/${board.id}`);
}}

            >
              <span className="font-semibold">{board.title}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBoard(board.id);
                }}
                className="absolute top-2 right-2"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CREATE BOARD MODAL */}
      {showModal && (
        <CreateBoardModal
          onClose={() => setShowModal(false)}
          onCreated={(b: Board) =>
            setBoards((prev) => [...prev, b])
          }
        />
      )}
    </main>
  );
}

/* ---------- MODAL ---------- */
function CreateBoardModal({ onClose, onCreated }: any) {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("workspace");
  const [theme, setTheme] = useState(THEMES[0].image);

  const createBoard = async () => {
    if (!title.trim()) return;

    const res = await fetch(`${API}/boards/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, visibility, theme }),
    });

    const board = await res.json();
    onCreated(board);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Create board</h3>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-3"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="workspace">Workspace</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <button
          onClick={createBoard}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
