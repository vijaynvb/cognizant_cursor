import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api';
import { TaskForm } from '../components/tasks/TaskForm';
import { CommentList } from '../components/tasks/CommentList';

export function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksApi.get(id!),
    enabled: !!id && id !== 'new',
  });

  const updateMutation = useMutation({
    mutationFn: (body: Parameters<typeof tasksApi.update>[1]) =>
      tasksApi.update(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => tasksApi.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/tasks');
    },
  });

  if (id === 'new') {
    return (
      <div className="task-detail-page">
        <h1>Create Task</h1>
        <TaskForm
          onSubmit={async (body) => {
            const created = await tasksApi.create(body);
            navigate(`/tasks/${created.id}`);
          }}
          onCancel={() => navigate('/tasks')}
        />
      </div>
    );
  }

  if (isLoading || !task) {
    return <div className="task-detail-page">Loading...</div>;
  }

  if (error) {
    return (
      <div className="task-detail-page">
        <p>Failed to load task.</p>
      </div>
    );
  }

  return (
    <div className="task-detail-page">
      <header>
        <h1>{task.title}</h1>
        <div className="actions">
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="btn-danger"
          >
            Delete
          </button>
        </div>
      </header>
      <TaskForm
        initialValues={task}
        onSubmit={async (body) => updateMutation.mutate(body)}
        onCancel={() => navigate('/tasks')}
      />
      <section>
        <h2>Comments</h2>
        <CommentList taskId={task.id} />
      </section>
    </div>
  );
}
