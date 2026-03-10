import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '../../api';

interface CommentListProps {
  taskId: string;
}

export function CommentList({ taskId }: CommentListProps) {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => commentsApi.list(taskId),
  });

  const addMutation = useMutation({
    mutationFn: (c: string) => commentsApi.add(taskId, c),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
      setContent('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => commentsApi.delete(taskId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addMutation.mutate(content.trim());
    }
  };

  if (isLoading) return <p>Loading comments...</p>;

  const comments = data?.data ?? [];

  return (
    <div className="comment-list">
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows={2}
        />
        <button type="submit" disabled={!content.trim() || addMutation.isPending}>
          Add Comment
        </button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.authorName}</strong>
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
              <button
                type="button"
                className="comment-delete"
                onClick={() => deleteMutation.mutate(comment.id)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </div>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
