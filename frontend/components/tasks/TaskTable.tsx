import type { Task } from "@/types/task";

export default function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-left text-sm text-white">
        <thead className="bg-slate-900 text-slate-300"><tr><th className="p-3">Title</th><th className="p-3">Assigned To</th><th className="p-3">Priority</th><th className="p-3">Status</th><th className="p-3">Due Date</th></tr></thead>
        <tbody>{tasks.map((task) => <tr key={task.TaskID} className="border-t border-slate-700"><td className="p-3">{task.Title}</td><td className="p-3">{task.AssignedTo}</td><td className="p-3">{task.Priority}</td><td className="p-3">{task.Status}</td><td className="p-3">{task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "—"}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
