"use client";

import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const THEMES = [
  { id: "blue", image: "/trello/blue.jpeg" },
  { id: "dark", image: "/trello/dark.jpeg" },
  { id: "green", image: "/trello/green.jpeg" },
  { id: "minimal", image: "/trello/minimal.jpeg" },
];

type Props = {
  onClose: () => void;
  onCreated: (board: any) => void;
};

export default function CreateBoardModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("workspace");
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/boards/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          visibility,
          theme: selectedTheme.image, // ✅ stored in DB
        }),
      });

      if (!res.ok) throw new Error("Create board failed");

      const board = await res.json();
      onCreated(board);
      onClose();
    } catch (err) {
      alert("Failed to create board");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-[92%] max-w-md rounded-lg p-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create board</h3>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* PREVIEW */}
        <div
          className="h-24 rounded-lg mb-4 flex items-end p-3 text-white font-semibold"
          style={{
            backgroundImage: `url(${selectedTheme.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {title || "Board title"}
        </div>

        {/* THEME PICKER */}
        <div className="flex gap-2 mb-4">
          {THEMES.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTheme(t)}
              className={`h-12 w-16 rounded cursor-pointer border-2 ${
                selectedTheme.id === t.id
                  ? "border-blue-600"
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

        {/* TITLE */}
        <input
          className="w-full border rounded p-2 mb-3"
          placeholder="Board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* VISIBILITY */}
        <select
          className="w-full border rounded p-2 mb-4"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="workspace">Workspace</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <button
          onClick={handleCreate}
          disabled={!title.trim() || loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-300"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
