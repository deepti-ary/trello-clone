"use client";

import CloseIcon from "@mui/icons-material/Close";
import { deleteBoard } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function BoardCard({ board, onDelete }: any) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteBoard(board.id);
    onDelete(board.id);
  };

  return (
    <div
      className="h-32 w-56 rounded-lg p-3 text-white relative cursor-pointer"
      style={{
        backgroundImage: `url(${board.theme})`,
        backgroundSize: "cover",
      }}
      onClick={() => router.push(`/boards/${board.id}`)}
    >
      <span className="font-semibold">{board.title}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="absolute top-2 right-2"
      >
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
}
