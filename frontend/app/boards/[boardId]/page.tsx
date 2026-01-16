"use client";

import { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import ListsContainer from "@/components/list/ListsContainer";
type Board = {
  id: number;
  title: string;
  theme: string;
  visibility: string;
};

export default function BoardPage() {
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("currentBoard");
    if (saved) {
      setBoard(JSON.parse(saved));
    }
  }, []);

  if (!board) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Board not found
      </div>
    );
  }

  return (
    <main
      className="min-h-screen p-4"
      style={{
        backgroundImage: `url(${board.theme})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">{board.title}</h1>
        <SortIcon />
      </header>

      
        <ListsContainer boardId={board.id} />

     
    </main>
  );
}
