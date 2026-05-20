import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth.js';
import './app-layout.scss';

export default function AppLayout() {
  const navigate = useNavigate();
  const { user, handleLogout, loading } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/" className="app-header__brand">
            <span className="app-header__brand-mark">AI</span>
            <div>
              <strong>Interview Studio</strong>
              <small>Practice smarter with AI</small>
            </div>
          </Link>

          <nav className="app-header__nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `app-header__nav-link ${isActive ? 'is-active' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tech"
              className={({ isActive }) =>
                `app-header__nav-link ${isActive ? 'is-active' : ''}`
              }
            >
              Tech Interview
            </NavLink>
            {user?.role === 'admin' ? (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `app-header__nav-link ${isActive ? 'is-active' : ''}`
                }
              >
                Admin
              </NavLink>
            ) : null}
          </nav>

          <div className="app-header__actions">
            <button
              type="button"
              className="app-header__theme-toggle"
              onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <span className={theme === 'dark' ? 'is-active' : ''}>Dark</span>
              <span className={theme === 'light' ? 'is-active' : ''}>Light</span>
            </button>

            {user ? (
              <>
                <span className="app-header__welcome">
                  {user.name ? `Hi, ${user.name}` : 'Welcome back'}
                </span>
                <button
                  type="button"
                  className="app-header__button app-header__button--primary"
                  onClick={onLogout}
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="app-header__button app-header__button--ghost">
                  Login
                </Link>
                <Link to="/register" className="app-header__button app-header__button--primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="app-shell__content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="app-footer__inner">
          <div>
            <strong>Interview Studio</strong>
            <p>AI-powered interview prep for resumes, role matching, and focused practice.</p>
          </div>

          <div className="app-footer__meta">
            <span>Built for stronger technical interviews</span>
            <span>{new Date().getFullYear()} Interview Studio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
