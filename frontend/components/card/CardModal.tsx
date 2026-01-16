"use client";

import NotesIcon from "@mui/icons-material/Notes";
import LabelIcon from "@mui/icons-material/Label";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CardSection from "./CardSection";
import { CardData } from "@/types/card";

type Props = {
  card: CardData;
  onClose: () => void;
};

export default function CardModal({ card, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start">
      <div className="bg-gray-100 rounded-lg w-[720px] mt-20 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {card.title}
        </h2>

        <CardSection icon={<NotesIcon />} title="Description">
          <textarea
            defaultValue={card.description}
            className="w-full border p-2 rounded"
          />
        </CardSection>

        <CardSection icon={<LabelIcon />} title="Labels">
          <div className="flex gap-2">
            {card.labels.map((l) => (
              <span
                key={l}
                className="px-2 py-1 bg-green-500 text-white text-xs rounded"
              >
                {l}
              </span>
            ))}
          </div>
        </CardSection>

        <CardSection icon={<AccessTimeIcon />} title="Due Date">
          {card.dueDate ?? "No due date"}
        </CardSection>

        <CardSection icon={<TextSnippetIcon />} title="Activity">
          {card.activity.map((a, i) => (
            <p key={i} className="text-sm text-gray-600">
              {a}
            </p>
          ))}
        </CardSection>
      </div>
    </div>
  );
}
