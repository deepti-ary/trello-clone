export type ChecklistItem = {
  text: string;
  done: boolean;
};

export type CardData = {
  id: number;
  title: string;
  description: string;
  labels: string[];
  members: string[];
  checklist: { text: string; done: boolean }[];
  dueDate?: string;
  activity: string[];
};
