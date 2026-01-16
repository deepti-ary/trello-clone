"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, User } from "@/api/users";

export default function LandingPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const selectUser = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    router.push("/home");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Choose a User</h1>

      <div className="flex gap-4">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => selectUser(user)}
            className="px-6 py-4 rounded-lg bg-white shadow hover:bg-gray-100"
          >
            {user.name}
          </button>
        ))}
      </div>
    </main>
  );
}
