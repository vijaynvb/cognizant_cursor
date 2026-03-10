import { Link } from 'react-router-dom';
import type { Task } from '../../types/api';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const priorityClass = `priority-${task.priority}`;
  const statusClass = `status-${task.status}`;

  return (
    <Link to={`/tasks/${task.id}`} className={`task-card ${priorityClass} ${statusClass}`}>
      <h3>{task.title}</h3>
      <div className="meta">
        <span className="status">{task.status}</span>
        <span className="priority">{task.priority}</span>
        {task.assigneeName && <span className="assignee">{task.assigneeName}</span>}
        {task.dueDate && (
          <span className={`due-date ${task.isOverdue ? 'overdue' : ''}`}>
            {task.dueDate}
          </span>
        )}
      </div>
      {task.tags.length > 0 && (
        <div className="tags">
          {task.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
