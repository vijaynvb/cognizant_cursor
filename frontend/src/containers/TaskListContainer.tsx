import { useQuery } from '@tanstack/react-query';
import { tasksApi, type TaskListParams } from '../api';
import { TaskList } from '../components/tasks/TaskList';

interface TaskListContainerProps {
  filters: TaskListParams;
  onFiltersChange: (filters: TaskListParams) => void;
}

export function TaskListContainer({
  filters,
  onFiltersChange,
}: TaskListContainerProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => tasksApi.list(filters),
  });

  const tasks = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="task-list-container">
      <div className="filters">
        <select
          value={filters.status ?? ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value || undefined,
            })
          }
        >
          <option value="">All statuses</option>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filters.priority ?? ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              priority: e.target.value || undefined,
            })
          }
        >
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <TaskList tasks={tasks} isLoading={isLoading} error={error} />
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={filters.page === 1}
            onClick={() =>
              onFiltersChange({ ...filters, page: (filters.page ?? 1) - 1 })
            }
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() =>
              onFiltersChange({ ...filters, page: (filters.page ?? 1) + 1 })
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
