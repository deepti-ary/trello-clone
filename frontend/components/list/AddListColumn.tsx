"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function AddListColumn({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="min-w-[260px] bg-white/30 hover:bg-white/40 rounded-lg p-3 text-left"
      >
        <AddIcon fontSize="small" /> Add another list
      </button>
    );
  }

  return (
    <div className="min-w-[260px] bg-white rounded-lg p-3">
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Enter list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />

      <button
        onClick={() => {
          if (!title.trim()) return;
          onAdd(title.trim());
          setTitle("");
          setOpen(false);
        }}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add list
      </button>
    </div>
  );
}
