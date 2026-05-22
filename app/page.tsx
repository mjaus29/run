"use client";

import { useState } from "react";

import {
  CORE_RULES,
  SUPPORT_WORK,
  TRAINING_PHASES,
  TRAINING_WEEKS,
  type TrainingPhase,
  type TrainingSession,
} from "./training-plan";

const SESSION_COLORS = {
  Easy: "#80ed99",
  Tempo: "#4cc9f0",
  Intervals: "#ff6b6b",
  "Long Run": "#f4a261",
  "Over/Under": "#ffd166",
} as const;

function getSessionTarget(session: TrainingSession, phase: TrainingPhase) {
  return phase.paceTargets[session.type] ?? phase.targetPace;
}

function getSessionCue(session: TrainingSession, phase: TrainingPhase) {
  if (session.note) {
    return session.note;
  }

  if (session.type === "Easy") {
    return "Conversational effort. This run protects the quality work.";
  }

  if (session.type === "Tempo") {
    return "Comfortably hard. Sit on the edge, do not sprint it.";
  }

  if (session.type === "Intervals") {
    return phase.id === "earth"
      ? "Fast turnover with clean mechanics from the first rep to the last."
      : "Hard but controlled. Finish the final rep with the same form you started with.";
  }

  if (session.type === "Over/Under") {
    return "Alternate pressure without breaking rhythm or posture.";
  }

  return phase.id === "air"
    ? "Start patient and let the second half drift quicker."
    : "Stay relaxed, stack easy minutes, and build durability.";
}

export default function Page() {
  const [planIndex, setPlanIndex] = useState(0);

  const plan = TRAINING_WEEKS[planIndex];
  const phase = plan.phase;
  const week = plan.week;
  const progress = ((planIndex + 1) / TRAINING_WEEKS.length) * 100;

  const movePlan = (direction: number) => {
    setPlanIndex((current) => {
      const next = current + direction;
      if (next < 0 || next >= TRAINING_WEEKS.length) {
        return current;
      }
      return next;
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(76, 201, 240, 0.18), transparent 28%), linear-gradient(180deg, #04101d 0%, #07131c 45%, #0a0a0a 100%)",
        color: "#f3f4f6",
        fontFamily: "var(--font-plex-mono), monospace",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        button { font: inherit; }
        .shell { max-width: 1120px; margin: 0 auto; padding: 32px 20px 56px; }
        .hero {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 28px;
          background: linear-gradient(135deg, rgba(12, 22, 35, 0.92), rgba(8, 12, 20, 0.82));
          backdrop-filter: blur(16px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
        }
        .hero::after {
          content: "";
          position: absolute;
          inset: auto -10% -30% auto;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(255, 209, 102, 0.16), transparent 68%);
          pointer-events: none;
        }
        .eyebrow {
          color: #8ecae6;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(300px, 1fr);
          gap: 20px;
          align-items: end;
          margin-top: 14px;
        }
        .hero h1 {
          margin: 0;
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(56px, 11vw, 108px);
          line-height: 0.92;
          letter-spacing: 0.04em;
        }
        .hero-copy {
          max-width: 560px;
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 14px;
        }
        .stat-grid,
        .run-grid,
        .pace-grid,
        .support-grid,
        .phase-pill-row {
          display: grid;
          gap: 12px;
        }
        .stat-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 20px;
        }
        .stat-card,
        .panel,
        .run-card,
        .pace-card,
        .support-card,
        .rule-card {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(9, 15, 24, 0.72);
          border-radius: 22px;
        }
        .stat-card {
          padding: 16px 18px;
        }
        .stat-label,
        .run-slot,
        .section-label,
        .week-kicker,
        .pace-label,
        .rule-label {
          font-size: 10px;
          color: #7c8ba1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .stat-value {
          margin-top: 8px;
          color: #f8fafc;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 20px;
          font-weight: 700;
        }
        .phase-pill-row {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 20px;
        }
        .phase-pill {
          text-align: left;
          border-radius: 18px;
          padding: 16px 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: #dbeafe;
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }
        .phase-pill:hover {
          transform: translateY(-2px);
        }
        .phase-pill.active {
          background: rgba(255, 255, 255, 0.07);
        }
        .phase-pill-title {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 19px;
          font-weight: 700;
          margin-top: 8px;
        }
        .phase-pill-text {
          margin-top: 8px;
          color: #94a3b8;
          font-size: 12px;
          line-height: 1.6;
        }
        .progress-shell {
          margin-top: 20px;
        }
        .progress-track {
          height: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.25s ease;
        }
        .progress-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          color: #7c8ba1;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .panel {
          margin-top: 24px;
          padding: 24px;
        }
        .week-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: start;
        }
        .week-title {
          margin: 6px 0 0;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: clamp(28px, 5vw, 44px);
          line-height: 1;
        }
        .week-subtitle {
          margin-top: 10px;
          max-width: 640px;
          color: #a8b4c7;
          font-size: 14px;
          line-height: 1.8;
        }
        .nav-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .nav-btn {
          min-width: 108px;
          border-radius: 999px;
          padding: 10px 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          color: #e2e8f0;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease;
        }
        .nav-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
        }
        .nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .week-meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 24px;
        }
        .meta-card {
          border-radius: 18px;
          padding: 16px 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
        }
        .meta-value {
          margin-top: 8px;
          color: #e5e7eb;
          line-height: 1.7;
          font-size: 14px;
        }
        .run-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 20px;
        }
        .run-card {
          padding: 18px;
          min-height: 230px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .run-type {
          margin-top: 10px;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 24px;
          font-weight: 700;
        }
        .run-workout {
          margin-top: 14px;
          color: #f8fafc;
          font-size: 19px;
          line-height: 1.45;
          font-family: var(--font-space-grotesk), sans-serif;
        }
        .run-target {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: grid;
          gap: 10px;
        }
        .run-detail-label {
          color: #7c8ba1;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .run-detail-value {
          color: #e5e7eb;
          font-size: 13px;
          line-height: 1.7;
        }
        .notes-list {
          display: grid;
          gap: 10px;
          margin-top: 18px;
        }
        .note-item {
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.025);
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 13px;
        }
        .pace-grid,
        .support-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 20px;
        }
        .pace-card,
        .support-card,
        .rule-card {
          padding: 18px;
        }
        .pace-value,
        .rule-title {
          margin-top: 10px;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 23px;
          font-weight: 700;
          color: #f8fafc;
        }
        .pace-copy,
        .rule-copy,
        .support-copy {
          margin-top: 10px;
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.7;
        }
        .support-card {
          min-height: 156px;
        }
        .footer {
          margin-top: 28px;
          text-align: center;
          color: #6b7280;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        @media (max-width: 920px) {
          .hero-grid,
          .stat-grid,
          .phase-pill-row,
          .run-grid,
          .pace-grid,
          .support-grid,
          .week-meta {
            grid-template-columns: 1fr;
          }
          .week-header {
            flex-direction: column;
          }
          .nav-row {
            width: 100%;
            justify-content: stretch;
          }
          .nav-btn {
            flex: 1;
          }
        }
      `}</style>

      <div className="shell">
        <section className="hero">
          <div className="eyebrow">24-week 10k progression</div>

          <div className="hero-grid">
            <div>
              <h1>WATER AIR EARTH</h1>
              <p className="hero-copy">
                Track a 24-week 10K progression built around three weekly runs,
                phase-based pace targets, and coaching notes from the Water,
                Air, and Earth system.
              </p>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Current phase</div>
                <div className="stat-value" style={{ color: phase.color }}>
                  {phase.label}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Target pace</div>
                <div className="stat-value">{phase.targetPace}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Structure</div>
                <div className="stat-value">3 runs + optional 4th</div>
              </div>
            </div>
          </div>

          <div className="phase-pill-row">
            {TRAINING_PHASES.map((item) => {
              const startIndex = TRAINING_WEEKS.findIndex(
                (entry) => entry.phase.id === item.id
              );

              return (
                <button
                  key={item.id}
                  className={`phase-pill ${item.id === phase.id ? "active" : ""}`}
                  onClick={() => setPlanIndex(startIndex)}
                  style={{
                    borderColor:
                      item.id === phase.id
                        ? `${item.color}66`
                        : "rgba(255, 255, 255, 0.08)",
                    background:
                      item.id === phase.id
                        ? item.bg
                        : "rgba(255, 255, 255, 0.03)",
                  }}
                >
                  <div className="stat-label">Target {item.targetPace}</div>
                  <div className="phase-pill-title">{item.label}</div>
                  <div className="phase-pill-text">{item.subtitle}</div>
                </button>
              );
            })}
          </div>

          <div className="progress-shell">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${phase.color}, #ffd166)`,
                }}
              />
            </div>
            <div className="progress-meta">
              <span>
                Week {planIndex + 1} of {TRAINING_WEEKS.length}
              </span>
              <span>
                {phase.label} / Week {week.week}
              </span>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="week-header">
            <div>
              <div className="week-kicker" style={{ color: phase.color }}>
                {phase.subtitle}
              </div>
              <h2 className="week-title">
                Week {week.week}: {week.focus}
              </h2>
              <p className="week-subtitle">{phase.objective}</p>
            </div>

            <div className="nav-row">
              <button
                className="nav-btn"
                onClick={() => movePlan(-1)}
                disabled={planIndex === 0}
              >
                Prev week
              </button>
              <button
                className="nav-btn"
                onClick={() => movePlan(1)}
                disabled={planIndex === TRAINING_WEEKS.length - 1}
              >
                Next week
              </button>
            </div>
          </div>

          <div className="week-meta">
            <div className="meta-card">
              <div className="section-label">Optional session 4</div>
              <div className="meta-value">{week.recovery}</div>
            </div>
            <div className="meta-card">
              <div className="section-label">Phase notes</div>
              <div className="meta-value">
                The quality run sets the signal, the easy run protects recovery,
                and the long run extends durability.
              </div>
            </div>
          </div>

          <div className="run-grid">
            {week.sessions.map((session) => {
              const sessionColor = SESSION_COLORS[session.type];

              return (
                <article
                  key={`${week.week}-${session.slot}`}
                  className="run-card"
                  style={{
                    borderColor: `${sessionColor}55`,
                    boxShadow: `inset 0 1px 0 ${sessionColor}1f`,
                  }}
                >
                  <div>
                    <div className="run-slot">{session.slot}</div>
                    <div className="run-type" style={{ color: sessionColor }}>
                      {session.type}
                    </div>
                    <div className="run-workout">{session.workout}</div>
                  </div>

                  <div className="run-target">
                    <div>
                      <div className="run-detail-label">Target pace</div>
                      <div className="run-detail-value">
                        {getSessionTarget(session, phase)}
                      </div>
                    </div>
                    <div>
                      <div className="run-detail-label">Cue</div>
                      <div className="run-detail-value">
                        {getSessionCue(session, phase)}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="notes-list">
            {phase.notes.map((note) => (
              <div key={note} className="note-item">
                {note}
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-label">Training pace targets</div>
          <div className="pace-grid">
            {phase.paceBands.map((band) => (
              <article
                key={band.label}
                className="pace-card"
                style={{ borderColor: `${phase.color}33` }}
              >
                <div className="pace-label">{band.label}</div>
                <div className="pace-value">{band.pace}</div>
                <div className="pace-copy">{band.cue}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-label">Rules that hold all cycle</div>
          <div className="support-grid">
            {CORE_RULES.map((rule) => (
              <article key={rule.label} className="rule-card">
                <div className="rule-label">Core rule</div>
                <div className="rule-title">{rule.label}</div>
                <div className="rule-copy">{rule.text}</div>
              </article>
            ))}
          </div>

          <div className="support-grid">
            {SUPPORT_WORK.map((item) => (
              <article key={item} className="support-card">
                <div className="rule-label">Support work</div>
                <div className="support-copy">{item}</div>
              </article>
            ))}
          </div>
        </section>

        <div className="footer">Train the pace. Keep the easy days easy.</div>
      </div>
    </div>
  );
}
