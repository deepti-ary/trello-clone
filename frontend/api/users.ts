export type User = {
  id: number;
  name: string;
};

export async function getUsers(): Promise<User[]> {
    fetch("http://127.0.0.1:8000/members")
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charles" },
  ];
}
