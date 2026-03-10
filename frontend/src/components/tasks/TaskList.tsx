import { TaskCard } from './TaskCard';
import type { Task } from '../../types/api';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
}

export function TaskList({ tasks, isLoading, error }: TaskListProps) {
  if (isLoading) {
    return <div className="task-list-loading">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="task-list-error">
        Failed to load tasks: {error.message}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <div className="task-list-empty">No tasks found.</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
