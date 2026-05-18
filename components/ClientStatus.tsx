
import React, { useEffect, useState } from 'react';

interface ClientStatusProps {
  projectGid: string;
  onBack: () => void;
}

interface StatusResponse {
  ok: boolean;
  project?: { gid: string; name: string; createdAt: string };
  stats?: {
    openCount: number;
    overdueCount: number;
    completedLast7Days: number;
    progressPct: number;
  };
  recentWins?: { gid: string; name: string; completedAt: string; assignee: string | null }[];
  upcoming?: { gid: string; name: string; due: string; assignee: string | null }[];
  overdue?: { gid: string; name: string; due: string; assignee: string | null }[];
  notes?: string;
  error?: string;
}

export const ClientStatus: React.FC<ClientStatusProps> = ({ projectGid, onBack }) => {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch(`/api/dashboard/client-status?projectGid=${encodeURIComponent(projectGid)}`);
        const json: StatusResponse = await resp.json();
        if (cancelled) return;
        if (!json.ok) {
          setError(json.error || 'Failed to load');
          return;
        }
        setData(json);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load');
      }
    })();
    return () => { cancelled = true; };
  }, [projectGid]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-xs tracking-widest uppercase text-red-600 font-bold mb-2">Couldn't load status</div>
          <p className="text-sm text-black/60 mb-6">{error}</p>
          <button onClick={onBack} className="text-sm text-brand-blue hover:underline">
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-black/40 text-sm tracking-widest uppercase font-medium">Loading status…</div>
      </div>
    );
  }

  const today = new Date();
  const reportDate = today.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-brand-black">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-6">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-10 w-auto" />
            <span className="text-xs tracking-widest uppercase text-black/50 font-bold">Status report</span>
          </div>
          <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-2">{reportDate}</div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold leading-tight tracking-tight mb-3">
            {data.project?.name}
          </h1>
          <p className="text-sm sm:text-base text-black/55">
            A snapshot of where things stand and what's next.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-10 sm:py-14 space-y-10">
        {/* Stats strip */}
        {data.stats && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Progress" value={`${data.stats.progressPct}%`} hint="last 7 days" />
            <Stat label="Open" value={data.stats.openCount} hint="active work" />
            <Stat label="Completed" value={data.stats.completedLast7Days} hint="this week" />
            <Stat label="Overdue" value={data.stats.overdueCount} hint={data.stats.overdueCount > 0 ? 'attention needed' : 'on track'} tone={data.stats.overdueCount > 0 ? 'red' : 'green'} />
          </section>
        )}

        {/* Recent wins */}
        {data.recentWins && data.recentWins.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight mb-4">
              🎉 Recent wins
            </h2>
            <ul className="space-y-2">
              {data.recentWins.map((w) => (
                <li
                  key={w.gid}
                  className="bg-white border border-black/5 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm leading-snug">{w.name}</div>
                    {w.assignee && (
                      <div className="text-[11px] text-black/45 mt-0.5">by {w.assignee.split(' ')[0]}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Upcoming */}
        {data.upcoming && data.upcoming.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight mb-4">
              📅 Upcoming
            </h2>
            <ul className="space-y-2">
              {data.upcoming.map((t) => (
                <li
                  key={t.gid}
                  className="bg-white border border-black/5 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="text-brand-blue flex-shrink-0 mt-0.5">●</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm leading-snug">{t.name}</div>
                    <div className="text-[11px] text-black/45 mt-0.5">
                      {formatStatusDate(t.due)}{t.assignee ? ` · ${t.assignee.split(' ')[0]}` : ''}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Overdue */}
        {data.overdue && data.overdue.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight mb-4 text-red-700">
              ⚠️ Needs attention
            </h2>
            <ul className="space-y-2">
              {data.overdue.map((t) => (
                <li
                  key={t.gid}
                  className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="text-red-500 flex-shrink-0 mt-0.5">!</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm leading-snug">{t.name}</div>
                    <div className="text-[11px] text-red-700 mt-0.5">
                      Due {formatStatusDate(t.due)}{t.assignee ? ` · ${t.assignee.split(' ')[0]}` : ''}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Notes (only show if non-empty) */}
        {data.notes && data.notes.trim() && (
          <section>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight mb-4">
              📝 Notes from the team
            </h2>
            <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
              <pre className="text-sm leading-relaxed text-black/75 whitespace-pre-wrap font-sans">{data.notes}</pre>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 lg:px-12 bg-white border-t border-black/5 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/DFB Blue Logomark.png" alt="DFB Digital" className="h-8 w-auto" />
            <span className="text-black/40 text-xs tracking-widest uppercase font-medium">Boutique Digital Agency</span>
          </div>
          <div className="text-xs text-black/45">
            Questions? <a href="mailto:joe@dfbdigital.com" className="text-brand-blue hover:underline">joe@dfbdigital.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Stat: React.FC<{
  label: string;
  value: number | string;
  hint?: string;
  tone?: 'red' | 'green' | 'default';
}> = ({ label, value, hint, tone = 'default' }) => {
  const valueClass =
    tone === 'red' ? 'text-red-600' :
    tone === 'green' ? 'text-green-700' :
    'text-brand-black';
  return (
    <div className="bg-white border border-black/5 rounded-2xl p-4">
      <div className="text-[10px] tracking-widest uppercase font-bold text-black/40">{label}</div>
      <div className={`text-2xl sm:text-3xl font-heading font-extrabold mt-1 ${valueClass}`}>{value}</div>
      {hint && <div className="text-[10px] text-black/45 mt-1">{hint}</div>}
    </div>
  );
};

function formatStatusDate(yyyymmdd: string): string {
  if (!yyyymmdd) return 'no date';
  const [y, m, d] = yyyymmdd.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}
