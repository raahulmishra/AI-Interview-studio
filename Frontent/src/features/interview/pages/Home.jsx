import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

const features = [
  {
    label: 'Question engine',
    title: 'Targeted mock questions',
    description: 'Generate role-specific technical and behavioral questions aligned with your profile.',
    value: '10'
  },
  {
    label: 'Readiness map',
    title: 'Skill-gap visibility',
    description: 'See exactly where you are strong and which skills need deeper revision before interview day.',
    value: '3'
  },
  {
    label: 'Prep operations',
    title: 'Focused prep roadmap',
    description: 'Move through a structured five-day preparation plan instead of guessing what to study next.',
    value: '5d'
  }
];

const metrics = [
  { value: '10+', label: 'Smart interview prompts' },
  { value: '5 Days', label: 'Preparation roadmap' },
  { value: '1 Flow', label: 'Resume to report analysis' }
];

const timeline = [
  'Resume parsed',
  'Role match scored',
  'Questions generated',
  'Prep plan ready'
];

export default function Home() {
  return (
    <section className="home">
      <div className="home__container">
        <div className="home__hero">
          <div className="home__copy">
            <span className="home__eyebrow">AI Interview Preparation Platform</span>
            <h1 className="home__title">Turn your next interview into a prepared performance.</h1>
            <p className="home__subtitle">
              A premium workspace for technical interview preparation. Analyze your profile, understand
              role fit, and practice with personalized guidance designed around the job you want.
            </p>

            <div className="home__actions">
              <Link to="/tech" className="home__button home__button--primary">
                Start Interview Analysis
              </Link>
              <a href="#features" className="home__button home__button--ghost">
                Explore Features
              </a>
            </div>

            <div className="home__metrics">
              {metrics.map((item) => (
                <div key={item.label} className="home__metric">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="home__visual">
            <div className="home__visual-card">
              <div className="home__visual-header">
                <div>
                  <span className="home__visual-badge">Live interview intelligence</span>
                  <h2>Candidate readiness report</h2>
                </div>
                <strong>87%</strong>
              </div>

              <div className="home__score">
                <span style={{ width: '87%' }} />
              </div>

              <div className="home__insight-grid">
                <div className="home__insight home__insight--large">
                  <span>Role fit</span>
                  <strong>Senior Frontend</strong>
                  <p>Strong React fundamentals with focused system-design practice recommended.</p>
                </div>
                <div className="home__insight">
                  <span>Questions</span>
                  <strong>10</strong>
                </div>
                <div className="home__insight">
                  <span>Prep Plan</span>
                  <strong>5 Days</strong>
                </div>
              </div>

              <div className="home__timeline">
                {timeline.map((item, index) => (
                  <div className="home__timeline-item" key={item}>
                    <span>{index + 1}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="home__feature-section">
          <div className="home__feature-header">
            <span className="home__section-tag">Why it feels different</span>
            <h3>Built to make your preparation feel deliberate, clear, and job-focused.</h3>
          </div>

          <div className="home__feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="home__feature-card">
                <span>{feature.label}</span>
                <strong>{feature.value}</strong>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="home__cta">
          <div>
            <span className="home__section-tag">Ready to begin</span>
            <h3>Step into your technical interview with a stronger plan.</h3>
            <p>
              Open the interview studio and generate a polished report from your resume and target role.
            </p>
          </div>

          <Link to="/tech" className="home__button home__button--primary">
            Open Technical Interview Studio
          </Link>
        </div>
      </div>
    </section>
  );
}
