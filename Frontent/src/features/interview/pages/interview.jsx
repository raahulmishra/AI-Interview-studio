import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview.js';
import { useAuth } from '../../auth/hooks/useAuth.js';
import './interview.scss';

const severityClassName = {
  Low: 'low',
  Medium: 'medium',
  High: 'high'
};

const formatDate = (value) => {
  if (!value) {
    return 'Recently generated';
  }

  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const studioSteps = [
  'Upload resume',
  'Map role fit',
  'Generate questions',
  'Build prep plan'
];

const readinessMetrics = [
  { label: 'Analysis depth', value: '4 layers' },
  { label: 'Output format', value: 'Actionable' },
  { label: 'Review mode', value: 'Saved' }
];

export default function Interview() {
  const { user, handleLogout } = useAuth();
  const { loading, report, reports, generateReport, getAllReports, getReportById } = useInterview();

  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const selectedFileSize = resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB` : null;

  useEffect(() => {
    getAllReports().catch((err) => {
      setError(err.message);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!resume) {
      setError('Please upload your resume in PDF format.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const generatedReport = await generateReport({
        jobDescription,
        selfDescription,
        resume
      });

      setSuccess(`Interview report for ${generatedReport.title} is ready.`);
      await getAllReports();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleHistorySelect = async (id) => {
    setError('');
    setSuccess('');

    try {
      await getReportById(id);
    } catch (err) {
      setError(err.message);
    }
  };

  const onLogout = async () => {
    try {
      await handleLogout();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`interview-page ${loading ? 'is-loading' : ''}`}>
      <div className="interview-page__shell">
        <header className="interview-page__hero">
          <div className="interview-page__hero-copy">
            <span className="interview-page__eyebrow">Technical Interview Studio</span>
            <h1 className="interview-page__title">Build a sharper interview plan from your real profile.</h1>
            <p className="interview-page__subtitle">
              Upload your resume, paste the role description, and get tailored technical questions,
              behavioral prompts, skill-gap analysis, and a focused five-day preparation roadmap.
            </p>

            <div className="interview-page__hero-stats">
              <div className="interview-page__stat">
                <strong>{reports?.length ?? 0}</strong>
                <span>Saved reports</span>
              </div>
              <div className="interview-page__stat">
                <strong>5</strong>
                <span>Prep days mapped</span>
              </div>
              <div className="interview-page__stat">
                <strong>10</strong>
                <span>Interview prompts</span>
              </div>
            </div>
          </div>

          <div className="interview-page__profile-card">
            <div>
              <p className="interview-page__profile-label">Candidate workspace</p>
              <h2>{user?.name || 'Candidate'}</h2>
              <p>{user?.email || 'Ready to generate your next report'}</p>
            </div>

            <div className="interview-page__readiness">
              {readinessMetrics.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="interview-page__profile-actions">
              <Link to="/" className="interview-page__ghost-button">
                Back Home
              </Link>
              <button type="button" className="interview-page__ghost-button" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="interview-page__grid">
          <section className="interview-page__panel interview-page__panel--form">
            <div className="interview-page__panel-head">
              <div>
                <span className="interview-page__section-tag">Generate report</span>
                <h3>Launch a new mock interview analysis</h3>
              </div>
              <span className="interview-page__status-pill">
                {loading ? 'Processing' : 'Ready'}
              </span>
            </div>

            <div className="interview-page__process">
              {studioSteps.map((step, index) => (
                <div className="interview-page__process-step" key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>

            <form className="interview-form" onSubmit={handleSubmit}>
              <label className="interview-form__field">
                <span>Target job description</span>
                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the job description, responsibilities, and required skills."
                  required
                />
              </label>

              <label className="interview-form__field">
                <span>Your introduction</span>
                <textarea
                  value={selfDescription}
                  onChange={(event) => setSelfDescription(event.target.value)}
                  placeholder="Summarize your experience, strengths, projects, and goals."
                  required
                />
              </label>

              <label className="interview-form__upload">
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(event) => setResume(event.target.files?.[0] ?? null)}
                  required
                />
                <div className="interview-form__upload-card">
                  <div className="interview-form__upload-icon">PDF</div>
                  <strong>{resume ? resume.name : 'Upload your resume PDF'}</strong>
                  <span>
                    {resume
                      ? `${selectedFileSize} selected`
                      : 'Choose a clean PDF so the backend can extract your text correctly.'}
                  </span>
                </div>
              </label>

              {(error || success) && (
                <div className={`interview-form__message ${error ? 'is-error' : 'is-success'}`}>
                  {error || success}
                </div>
              )}

              <button type="submit" className="interview-form__submit" disabled={loading}>
                {loading ? 'Generating your interview report...' : 'Generate report'}
              </button>
            </form>
          </section>

          <aside className="interview-page__panel interview-page__panel--history">
            <div className="interview-page__panel-head">
              <div>
                <span className="interview-page__section-tag">History</span>
                <h3>Previous interview reports</h3>
              </div>
              <span className="interview-page__count-pill">{reports?.length ?? 0}</span>
            </div>

            <div className="history-list">
              {reports?.length ? (
                reports.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    className={`history-list__item ${report?._id === item._id ? 'is-active' : ''}`}
                    onClick={() => handleHistorySelect(item._id)}
                  >
                    <div>
                      <strong>{item.title}</strong>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    <small>
                      <b>{item.matchScore}%</b>
                      match
                    </small>
                  </button>
                ))
              ) : (
                <div className="history-list__empty">
                  Your generated reports will appear here for quick review.
                </div>
              )}
            </div>
          </aside>

          <section className="interview-page__panel interview-page__panel--report">
            <div className="interview-page__panel-head">
              <div>
                <span className="interview-page__section-tag">Live report</span>
                <h3>{report?.title || 'Your generated report will appear here'}</h3>
              </div>
              {report?.matchScore >= 0 && (
                <div
                  className="interview-page__score-ring"
                  style={{ '--score': report.matchScore }}
                >
                  <strong>{report.matchScore}%</strong>
                  <span>Match score</span>
                </div>
              )}
            </div>

            {report ? (
              <div className="report-view">
                <section className="report-view__summary">
                  <article>
                    <span>Technical</span>
                    <strong>{report.technicalQuestions?.length || 0}</strong>
                  </article>
                  <article>
                    <span>Behavioral</span>
                    <strong>{report.behavioralQuestions?.length || 0}</strong>
                  </article>
                  <article>
                    <span>Skill gaps</span>
                    <strong>{report.skillGaps?.length || 0}</strong>
                  </article>
                </section>

                <section className="report-view__section">
                  <h4>Skill gaps</h4>
                  <div className="report-view__chips">
                    {report.skillGaps?.map((gap, index) => (
                      <div key={`${gap.skill}-${index}`} className="report-view__chip">
                        <span>{gap.skill}</span>
                        <strong className={severityClassName[gap.severity] || ''}>{gap.severity}</strong>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="report-view__section">
                  <h4>Technical questions</h4>
                  <div className="report-view__stack">
                    {report.technicalQuestions?.map((item, index) => (
                      <article key={`tech-${index}`} className="report-view__card">
                        <p className="report-view__question">
                          {index + 1}. {item.question}
                        </p>
                        <p><span>Why it matters:</span> {item.intention}</p>
                        <p><span>Strong answer:</span> {item.answers}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="report-view__section">
                  <h4>Behavioral questions</h4>
                  <div className="report-view__stack">
                    {report.behavioralQuestions?.map((item, index) => (
                      <article key={`behavior-${index}`} className="report-view__card">
                        <p className="report-view__question">
                          {index + 1}. {item.question}
                        </p>
                        <p><span>Why it matters:</span> {item.intention}</p>
                        <p><span>Strong answer:</span> {item.answers}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="report-view__section">
                  <h4>5-day preparation plan</h4>
                  <div className="report-view__timeline">
                    {report.preparationPlan?.map((dayPlan) => (
                      <article key={dayPlan.day} className="report-view__timeline-item">
                        <div className="report-view__timeline-day">Day {dayPlan.day}</div>
                        <div className="report-view__timeline-body">
                          <strong>{dayPlan.focusArea}</strong>
                          <ul>
                            {dayPlan.task?.map((taskItem, index) => (
                              <li key={`${dayPlan.day}-${index}`}>{taskItem}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="report-view__empty">
                <p>No report selected yet.</p>
                <span>Generate a new interview report or open one from your history to review it here.</span>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
