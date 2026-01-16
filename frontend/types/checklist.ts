export type Checklist = {
  id: number;
  card_id: number;
  title: string;
};
export type ChecklistItem = {
  id: number;
  checklist_id: number;
  content: string;
  is_completed: boolean;
};
