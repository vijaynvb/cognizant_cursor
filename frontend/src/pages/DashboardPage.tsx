import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-page">
      <header>
        <h1>Welcome, {user?.displayName ?? 'User'}</h1>
        <nav>
          <Link to="/tasks">Tasks</Link>
          <Link to="/reports">Reports</Link>
          <button onClick={logout}>Sign Out</button>
        </nav>
      </header>
      <main>
        <Link to="/tasks" className="card">
          <h2>Tasks</h2>
          <p>View and manage your tasks</p>
        </Link>
        <Link to="/reports" className="card">
          <h2>Reports</h2>
          <p>View productivity and completion reports</p>
        </Link>
      </main>
    </div>
  );
}
