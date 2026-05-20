import { useEffect, useMemo, useState } from 'react';
import { getAdminOverview } from './admin.api';
import './admin-dashboard.scss';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(date));

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadOverview = async () => {
      try {
        const data = await getAdminOverview();
        if (mounted) {
          setOverview(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadOverview();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = overview?.stats || {};
  const users = overview?.users || [];
  const activities = overview?.activities || [];

  const topUsers = useMemo(
    () => [...users].sort((a, b) => b.totalReports - a.totalReports).slice(0, 4),
    [users]
  );

  if (loading) {
    return (
      <section className="admin-dashboard admin-dashboard--center">
        <div className="admin-dashboard__loader" />
        <p>Loading admin dashboard...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-dashboard admin-dashboard--center">
        <div className="admin-dashboard__empty">
          <span>!</span>
          <h1>Admin dashboard unavailable</h1>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard__inner">
        <div className="admin-dashboard__hero">
          <div>
            <span className="admin-dashboard__eyebrow">Admin overview</span>
            <h1>Team activity and users in one clean control room.</h1>
          </div>
          <div className="admin-dashboard__pulse">
            <span />
            Live workspace
          </div>
        </div>

        <div className="admin-dashboard__stats">
          <article className="admin-dashboard__stat">
            <span>Total users</span>
            <strong>{stats.totalUsers || 0}</strong>
          </article>
          <article className="admin-dashboard__stat">
            <span>Reports created</span>
            <strong>{stats.totalReports || 0}</strong>
          </article>
          <article className="admin-dashboard__stat">
            <span>Avg match score</span>
            <strong>{stats.averageMatchScore || 0}%</strong>
          </article>
          <article className="admin-dashboard__stat">
            <span>Recent activity</span>
            <strong>{stats.activeSessions || 0}</strong>
          </article>
        </div>

        <div className="admin-dashboard__grid">
          <div className="admin-dashboard__panel admin-dashboard__panel--wide">
            <div className="admin-dashboard__panel-header">
              <div>
                <span className="admin-dashboard__section-label">Users</span>
                <h2>All users</h2>
              </div>
              <span>{users.length} records</span>
            </div>

            <div className="admin-dashboard__table-wrap">
              <table className="admin-dashboard__table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Reports</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="admin-dashboard__user">
                          <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                          <strong>{user.name || 'Unnamed user'}</strong>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.totalReports}</td>
                      <td>{formatDate(user.joinedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="admin-dashboard__panel">
            <div className="admin-dashboard__panel-header">
              <div>
                <span className="admin-dashboard__section-label">Activity</span>
                <h2>Latest reports</h2>
              </div>
            </div>

            <div className="admin-dashboard__activity-list">
              {activities.length === 0 ? (
                <p className="admin-dashboard__muted">No activity yet.</p>
              ) : (
                activities.map((activity) => (
                  <article className="admin-dashboard__activity" key={activity.id}>
                    <div>
                      <strong>{activity.title || 'Interview report'}</strong>
                      <span>
                        {activity.user?.name || 'Unknown user'} - {formatDate(activity.createdAt)}
                      </span>
                    </div>
                    <b>{activity.matchScore}%</b>
                  </article>
                ))
              )}
            </div>
          </aside>
        </div>

        <div className="admin-dashboard__panel">
          <div className="admin-dashboard__panel-header">
            <div>
              <span className="admin-dashboard__section-label">Performance</span>
              <h2>Most active users</h2>
            </div>
          </div>

          <div className="admin-dashboard__leaderboard">
            {topUsers.map((user, index) => (
              <article className="admin-dashboard__leader" key={user.id}>
                <span>{index + 1}</span>
                <div>
                  <strong>{user.name || 'Unnamed user'}</strong>
                  <small>{user.email}</small>
                </div>
                <b>{user.totalReports} reports</b>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
