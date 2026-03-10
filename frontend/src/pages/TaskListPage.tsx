import { useState } from 'react';
import { Link } from 'react-router-dom';
import { type TaskListParams } from '../api';
import { TaskListContainer } from '../containers/TaskListContainer';

export function TaskListPage() {
  const [filters, setFilters] = useState<TaskListParams>({
    page: 1,
    limit: 20,
  });

  return (
    <div className="task-list-page">
      <header>
        <h1>Tasks</h1>
        <Link to="/tasks/new" className="btn-primary">
          New Task
        </Link>
      </header>
      <TaskListContainer filters={filters} onFiltersChange={setFilters} />
    </div>
  );
}
