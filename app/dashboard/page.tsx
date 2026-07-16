"use client";

import { useEffect,useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string | null;
};

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  
  
  const fetchTasks = async () => {
  const response = await fetch("/api/tasks");

  const data = await response.json();

  setTasks(data);
};

useEffect(() => {
  fetchTasks();
}, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const response = await fetch(
  editingTaskId
    ? `/api/tasks/${editingTaskId}`
    : "/api/tasks",
  {
    method: editingTaskId ? "PUT" : "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title,
      description,
    }),
  }
);

    const data = await response.json();

    if (response.ok) {
  alert(
    editingTaskId
      ? "Task updated successfully"
      : "Task created successfully"
  );

  fetchTasks();

  setTitle("");
  setDescription("");
  setEditingTaskId(null);

  console.log(data);
} else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96"
      >
        <h1 className="text-3xl font-bold text-center">
          Dashboard
        </h1>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <button type="submit"
         className="bg-black text-white p-2 rounded">
         {editingTaskId ? "Update Task" : "Create Task"}
        </button>
      </form>
      <div className="mt-8 w-96">
  {tasks.map((task) => (
    <div
      key={task.id}
      className="border p-4 rounded mb-4"
    >
      <h2 className="font-bold">
        {task.title}
      </h2>

      <p>{task.description}</p>
      <button onClick={async () => {
         await fetch(`/api/tasks/${task.id}`, {
          method: "DELETE",
         });

        fetchTasks();
         }}
        className="bg-red-500 text-white px-3 py-1 rounded mt-2">
         Delete
        </button>

        <button
         onClick={() => {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description || "");
        }}
        className="bg-blue-500 text-white px-3 py-1 rounded mt-2 ml-2">
        Edit
        </button>
    </div>
  ))}
</div>
    </main>
  );
}