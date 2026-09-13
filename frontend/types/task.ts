export interface Task {
  TaskID: number;
  Title: string;
  Description?: string;
  AssignedTo: number;
  Priority: string;
  Status: string;
  DueDate: string;
}
export type TaskCreate = Omit<Task, "TaskID">;
export type TaskUpdate = Partial<TaskCreate>;
