import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
] as const;

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    const result = loginSchema.safeParse({ email, password });
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
      await login(email, password);
      navigate('/tasks');
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Login failed';
      setApiError(message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__form-section">
        <h1 className="login-page__brand">Company Name</h1>
        <p className="login-page__welcome">Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit} className="login-form">
          {apiError && <div className="error-banner">{apiError}</div>}
          <div className="login-form__field">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="login-form__input"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="login-form__field">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="login-form__input"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          <div className="login-form__row">
            <label className="login-form__checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-form__checkbox"
              />
              <span className="login-form__checkbox-text">Remember me</span>
            </label>
          </div>
          <div className="login-form__actions">
            <button type="submit" className="login-form__btn login-form__btn--primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
            <button type="button" className="login-form__btn login-form__btn--secondary">
              Register
            </button>
          </div>
        </form>
      </div>

      <div className="login-page__illustration-section">
        <nav className="login-page__nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`login-page__nav-link ${link.label === 'Home' ? 'login-page__nav-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="login-page__illustration">
          <img src="/login-illustration.png" alt="" aria-hidden />
        </div>
      </div>
    </div>
  );
}
