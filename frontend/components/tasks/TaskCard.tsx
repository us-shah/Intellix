import type { Task } from "@/types/task";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-white">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">{task.Title}</h3>
        <span className="rounded bg-slate-800 px-2 py-1 text-xs">{task.Status}</span>
      </div>
      {task.Description && <p className="mt-2 text-sm text-slate-300">{task.Description}</p>}
      <div className="mt-4 flex justify-between text-xs text-slate-400">
        <span>{task.Priority}</span>
        <span>{task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "No due date"}</span>
      </div>
    </article>
  );
}
