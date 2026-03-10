import { useState } from 'react';
import { z } from 'zod';
import type { Task, CreateTaskRequest, TaskStatus, TaskPriority } from '../../types/api';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['todo', 'inProgress', 'blocked', 'completed']),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
  assigneeId: z.string().optional().or(z.literal('')),
  tags: z.array(z.string()).max(10).optional(),
});

interface TaskFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (body: CreateTaskRequest) => Promise<void>;
  onCancel: () => void;
}

export function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(
    initialValues?.description ?? ''
  );
  const [priority, setPriority] = useState<TaskPriority>(
    initialValues?.priority ?? 'medium'
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialValues?.status ?? 'todo'
  );
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? '');
  const [assigneeId, setAssigneeId] = useState(
    initialValues?.assigneeId ?? ''
  );
  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = taskSchema.safeParse({
      title,
      description: description || undefined,
      priority,
      status,
      dueDate: dueDate || undefined,
      assigneeId: assigneeId || undefined,
      tags,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = String(err.path[0] ?? '');
        if (path) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        title: result.data.title,
        description: result.data.description,
        priority: result.data.priority,
        status: result.data.status,
        dueDate: result.data.dueDate,
        assigneeId: result.data.assigneeId || undefined,
        tags: result.data.tags,
      });
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t) && tags.length < 10) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="row">
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="assigneeId">Assignee ID</label>
          <input
            id="assigneeId"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            placeholder="Optional user ID"
          />
        </div>
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <div className="tag-input">
          <input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add tag"
          />
          <button type="button" onClick={addTag}>
            Add
          </button>
        </div>
        <div className="tag-list">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
