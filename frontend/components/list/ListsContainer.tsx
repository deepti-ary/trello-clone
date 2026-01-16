"use client";

import { useEffect, useState } from "react";
import AddListColumn from "./AddListColumn";
import ListColumn from "./ListColumn";

type List = {
  id: number;
  title: string;
  position: number;
};

const API = "http://127.0.0.1:8000";

export default function ListsContainer({ boardId }: { boardId: number }) {
  const [lists, setLists] = useState<List[]>([]);

  // load lists for THIS board only
  useEffect(() => {
    fetch(`${API}/lists/board/${boardId}`)
      .then((res) => res.json())
      .then(setLists)
      .catch(() => setLists([]));
  }, [boardId]);

  // add list for THIS board only
  const addList = async (title: string) => {
    const position = lists.length;

    const res = await fetch(`${API}/lists/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        board_id: boardId,   // 🔑 THIS is the link
        title,
        position,
      }),
    });

    const newList = await res.json();
    setLists((prev) => [...prev, newList]);
  };

  return (
    <section className="flex gap-4 overflow-x-auto pb-4">
      {lists.map((list) => (
        <ListColumn key={list.id} list={list} />
      ))}

      {/* THIS is your Add List button */}
      <AddListColumn onAdd={addList} />
    </section>
  );
}
