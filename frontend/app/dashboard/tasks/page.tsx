"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/task";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Due Date</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.TaskID}>
                <td className="p-3">{task.TaskID}</td>
                <td className="p-3">{task.Title}</td>
                <td className="p-3">{task.Description}</td>
                <td className="p-3">{task.AssignedTo}</td>
                <td className="p-3">{task.Priority}</td>
                <td className="p-3">{task.Status}</td>
                <td className="p-3">
                  {task.DueDate
                    ? new Date(task.DueDate).toLocaleDateString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}