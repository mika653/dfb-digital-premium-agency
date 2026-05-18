
import React, { useState, useEffect, useCallback } from 'react';

interface DashboardProps {
  onBack: () => void;
}

interface Task {
  gid: string;
  name: string;
  due: string | null;
  assignee: { gid: string; name: string } | null;
  projects: { gid: string; name: string }[];
  url: string;
  notes: string;
  ageDays?: number;
}

interface Buckets {
  overdue: Task[];
  today: Task[];
  thisWeek: Task[];
  upcoming: Task[];
  noDate: Task[];
}

interface ClientTile {
  gid: string;
  name: string;
  total: number;
  overdue: number;
  today: number;
  upcoming: number;
  oldestAgeDays: number;
  atRisk: boolean;
}

interface CapacityRow {
  gid: string;
  name: string;
  total: number;
  overdue: number;
  today: number;
  thisWeek: number;
}

interface WinTask {
  gid: string;
  name: string;
  assignee: { gid: string; name: string } | null;
  projects: { gid: string; name: string }[];
  url: string;
}

interface TasksResponse {
  ok: boolean;
  me?: { gid: string; name: string; email: string };
  workspaceGid?: string;
  counts?: Record<string, number>;
  buckets?: Buckets;
  clients?: ClientTile[];
  capacity?: CapacityRow[];
  wins?: WinTask[];
  error?: string;
}

interface MetaResponse {
  ok: boolean;
  users?: { gid: string; name: string; email: string }[];
  projects?: { gid: string; name: string }[];
  error?: string;
}

const VIEWER_GID_KEY = 'dfb_dash_viewer_gid';

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [data, setData] = useState<TasksResponse | null>(null);
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewerGid, setViewerGidState] = useState<string | null>(null);

  // Load viewer choice from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(VIEWER_GID_KEY);
      if (stored) setViewerGidState(stored);
    } catch {
      // localStorage blocked — silently ignore
    }
  }, []);

  const setViewerGid = (gid: string | null) => {
    setViewerGidState(gid);
    try {
      if (gid) window.localStorage.setItem(VIEWER_GID_KEY, gid);
      else window.localStorage.removeItem(VIEWER_GID_KEY);
    } catch {
      // ignore
    }
  };

  // Try fetching tasks immediately. If 401, show login.
  const loadTasks = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const [tasksResp, metaResp] = await Promise.all([
        fetch('/api/dashboard/tasks', { credentials: 'include' }),
        fetch('/api/dashboard/meta', { credentials: 'include' }),
      ]);
      if (tasksResp.status === 401) {
        setAuthed(false);
        setChecking(false);
        setRefreshing(false);
        return;
      }
      const tasksJson: TasksResponse = await tasksResp.json();
      const metaJson: MetaResponse = await metaResp.json();
      if (!tasksJson.ok) throw new Error(tasksJson.error || 'Failed to load tasks');
      setData(tasksJson);
      setMeta(metaJson.ok ? metaJson : null);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setChecking(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-black/40 text-sm tracking-widest uppercase font-medium">Loading dashboard…</div>
      </div>
    );
  }

  if (!authed) {
    return <DashboardLogin onSuccess={loadTasks} onBack={onBack} />;
  }

  // After auth, if viewer hasn't picked who they are yet, show picker
  const viewerOptions = data?.capacity || [];
  if (!viewerGid && viewerOptions.length > 0) {
    return (
      <ViewerPicker
        options={viewerOptions}
        onPick={(gid) => setViewerGid(gid)}
      />
    );
  }

  return (
    <DashboardHome
      data={data}
      meta={meta}
      onRefresh={loadTasks}
      refreshing={refreshing}
      error={error}
      onBack={onBack}
      viewerGid={viewerGid}
      onChangeViewer={() => setViewerGid(null)}
    />
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Login

const DashboardLogin: React.FC<{ onSuccess: () => void; onBack: () => void }> = ({ onSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');
    try {
      const resp = await fetch('/api/dashboard/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.ok) {
        throw new Error(json.error || 'Login failed');
      }
      onSuccess();
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : 'Login failed');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="text-xs tracking-widest uppercase text-black/40 hover:text-black smooth-transition mb-8 inline-flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to site
        </button>

        <div className="flex items-center gap-3 mb-10">
          <img src="/DFB Blue Logomark Tight.png" alt="DFB Digital" className="h-12 w-auto" />
          <div>
            <div className="text-xs tracking-widest uppercase text-brand-blue font-bold">Internal</div>
            <div className="text-xl font-heading font-bold text-brand-black">Dashboard</div>
          </div>
        </div>

        <form onSubmit={submit} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
          <label className="block text-xs font-bold tracking-widest uppercase text-black/60 mb-3">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-brand-black text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
            placeholder="Enter shared password"
          />

          {status === 'error' && errMsg && (
            <p className="mt-3 text-sm text-red-600">{errMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 w-full px-8 py-3 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition disabled:opacity-50"
          >
            {status === 'sending' ? 'Checking…' : 'Enter'}
          </button>
        </form>

        <p className="mt-6 text-[10px] text-black/30 text-center tracking-widest uppercase">
          DFB Digital · Joe + Mika only
        </p>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Home (the actual dashboard)

const DashboardHome: React.FC<{
  data: TasksResponse | null;
  meta: MetaResponse | null;
  onRefresh: () => void;
  refreshing: boolean;
  error: string | null;
  onBack: () => void;
  viewerGid: string | null;
  onChangeViewer: () => void;
}> = ({ data, meta, onRefresh, refreshing, error, onBack, viewerGid, onChangeViewer }) => {
  const buckets = data?.buckets;
  const counts = data?.counts;
  const viewer = data?.capacity?.find((c) => c.gid === viewerGid) || null;
  const [weeklyOpen, setWeeklyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-brand-black">
      {/* Header — mobile-friendly */}
      <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src="/DFB Blue Logomark Tight.png" alt="DFB Digital" className="h-7 sm:h-8 w-auto flex-shrink-0" />
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-black/50 font-bold truncate">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-widest uppercase text-black/50 font-medium">
            <button
              onClick={() => setWeeklyOpen(true)}
              className="hover:text-brand-blue smooth-transition"
              title="Weekly review"
            >
              Weekly
            </button>
            {viewer && (
              <button
                onClick={onChangeViewer}
                className="hidden sm:inline hover:text-brand-blue smooth-transition"
                title="Switch user"
              >
                {viewer.name.split(' ')[0]} ↻
              </button>
            )}
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="hover:text-brand-blue smooth-transition disabled:opacity-50"
            >
              {refreshing ? '…' : 'Refresh'}
            </button>
            <button onClick={onBack} className="hover:text-brand-blue smooth-transition">Site</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 space-y-6 sm:space-y-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            {error}
          </div>
        )}

        {/* Good morning — personalized greeting */}
        {viewer && buckets && (
          <Greeting viewer={viewer} buckets={buckets} onChangeViewer={onChangeViewer} />
        )}

        {/* Quick-add — TOP of the page so Joe can add on the go */}
        {meta && <QuickAdd meta={meta} onCreated={onRefresh} viewer={viewer} />}

        {/* Counts strip */}
        {counts && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <Stat label="Overdue" value={counts.overdue} accent="red" />
            <Stat label="Today" value={counts.today} accent="blue" />
            <Stat label="This week" value={counts.thisWeek} accent="black" />
            <Stat label="Upcoming" value={counts.upcoming} accent="muted" />
          </div>
        )}

        {/* Team capacity */}
        {data?.capacity && data.capacity.length > 0 && (
          <CapacityStrip rows={data.capacity} viewerGid={viewerGid} />
        )}

        {/* Side by side — who's blocking who */}
        {buckets && data?.capacity && data.capacity.length >= 2 && (
          <SideBySide
            buckets={buckets}
            people={data.capacity}
            viewerGid={viewerGid}
          />
        )}

        {/* Clients */}
        {data?.clients && data.clients.length > 0 && (
          <ClientsGrid clients={data.clients} />
        )}

        {/* Lists */}
        {buckets && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <TaskBucket title="Overdue" tone="red" tasks={buckets.overdue} />
            <TaskBucket title="Due today" tone="blue" tasks={buckets.today} />
            <TaskBucket title="This week" tone="neutral" tasks={buckets.thisWeek} />
            <TaskBucket title="Upcoming" tone="muted" tasks={buckets.upcoming} />
          </div>
        )}
      </main>

      {/* Weekly review modal */}
      {weeklyOpen && data && (
        <WeeklyReview
          data={data}
          viewerGid={viewerGid}
          onClose={() => setWeeklyOpen(false)}
        />
      )}
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Viewer picker (shown once, choice stored in localStorage)

const ViewerPicker: React.FC<{
  options: CapacityRow[];
  onPick: (gid: string) => void;
}> = ({ options, onPick }) => {
  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="text-xs tracking-widest uppercase text-brand-blue font-bold mb-4">Welcome</div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-black mb-8 leading-tight">
          Who's using this dashboard?
        </h1>
        <div className="space-y-3">
          {options.map((u) => (
            <button
              key={u.gid}
              onClick={() => onPick(u.gid)}
              className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-left hover:border-brand-blue hover:bg-brand-blue/[0.03] smooth-transition active:scale-[0.98]"
            >
              <div className="font-bold text-lg tracking-tight">{u.name}</div>
              <div className="text-xs text-black/50 mt-1">
                {u.total} open · {u.overdue > 0 ? `${u.overdue} overdue` : 'on track'}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-8 text-[10px] tracking-widest uppercase text-black/30">
          We remember on this device.
        </p>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Good Morning greeting

const Greeting: React.FC<{
  viewer: CapacityRow;
  buckets: Buckets;
  onChangeViewer: () => void;
}> = ({ viewer, buckets, onChangeViewer }) => {
  const firstName = viewer.name.split(' ')[0];
  const hour = new Date().getHours();
  const salute =
    hour < 5 ? 'Burning the midnight oil' :
    hour < 12 ? 'Good morning' :
    hour < 18 ? 'Good afternoon' :
    hour < 22 ? 'Good evening' :
    'Working late';
  const emoji =
    hour < 5 ? '🌙' :
    hour < 12 ? '☀️' :
    hour < 18 ? '👋' :
    hour < 22 ? '🌆' :
    '🌙';

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Filter my tasks
  const myToday = buckets.today.filter((t) => t.assignee?.gid === viewer.gid);
  const myOverdue = buckets.overdue.filter((t) => t.assignee?.gid === viewer.gid);
  // Top 3 priorities: overdue first, then today
  const priorities = [...myOverdue, ...myToday].slice(0, 3);

  return (
    <section className="bg-gradient-to-br from-white to-[#FAFAF7] border border-black/5 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="text-xs tracking-widest uppercase text-black/40 font-bold">{today}</div>
        <button
          onClick={onChangeViewer}
          className="sm:hidden text-[10px] tracking-widest uppercase text-black/40 hover:text-brand-blue smooth-transition"
        >
          Not {firstName}?
        </button>
      </div>
      <h1 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight leading-tight mb-3">
        {salute}, {firstName} <span className="inline-block">{emoji}</span>
      </h1>

      {/* At-a-glance */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-6">
        <span className="text-black/70">
          You have <strong className="text-brand-black">{viewer.total} open</strong>
        </span>
        {viewer.overdue > 0 && (
          <span className="text-red-600">
            <strong>{viewer.overdue} overdue</strong>
          </span>
        )}
        {viewer.today > 0 && (
          <span className="text-brand-blue">
            <strong>{viewer.today} today</strong>
          </span>
        )}
        {viewer.thisWeek > 0 && (
          <span className="text-black/55">
            {viewer.thisWeek} this week
          </span>
        )}
      </div>

      {/* Top 3 priorities */}
      {priorities.length > 0 ? (
        <div>
          <div className="text-[11px] tracking-widest uppercase font-bold text-black/40 mb-3">
            Your focus today
          </div>
          <ul className="space-y-2">
            {priorities.map((t, idx) => {
              const isOver = !!t.due && new Date(t.due) < startOfTodayJs();
              return (
                <li key={t.gid}>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-xl bg-white border border-black/5 hover:border-brand-blue hover:shadow-sm smooth-transition"
                  >
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isOver ? 'bg-red-100 text-red-700' : 'bg-brand-blue/10 text-brand-blue'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm leading-snug">{t.name}</div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-black/50 mt-1">
                        {t.projects?.[0] && <span className="truncate">{t.projects[0].name}</span>}
                        {isOver && <span className="text-red-600 font-semibold">overdue</span>}
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="bg-[#FAFAF7] border border-black/5 rounded-xl px-4 py-3 text-sm text-black/60">
          🎉 Nothing urgent for you today. Plan ahead in the lists below.
        </div>
      )}
    </section>
  );
};

function startOfTodayJs() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// ───────────────────────────────────────────────────────────────────────────
// Subcomponents

const Stat: React.FC<{ label: string; value: number; accent: 'red' | 'blue' | 'black' | 'muted' }> = ({ label, value, accent }) => {
  const valueClass =
    accent === 'red' ? 'text-red-600' :
    accent === 'blue' ? 'text-brand-blue' :
    accent === 'black' ? 'text-brand-black' :
    'text-black/40';
  return (
    <div className="bg-white border border-black/5 rounded-2xl p-5">
      <div className="text-[10px] tracking-widest uppercase font-bold text-black/40 mb-2">{label}</div>
      <div className={`text-4xl font-heading font-extrabold ${valueClass}`}>{value}</div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Side by side — "Who's blocking who" for a 2-person team
//
// Shows each person's current plate (overdue, today, this week) so you can
// see at a glance who's holding the ball on what. For a 2-person agency
// this often answers "what's blocking my work" without explicit dependency
// tracking — if you need Joe to do X before you can do Y, his column tells
// you whether X is on his plate.

const SideBySide: React.FC<{
  buckets: Buckets;
  people: CapacityRow[];
  viewerGid: string | null;
}> = ({ buckets, people, viewerGid }) => {
  const top2 = people.slice(0, 2);
  if (top2.length < 2) return null;

  const tasksFor = (gid: string) => {
    const items = [
      ...buckets.overdue.filter((t) => t.assignee?.gid === gid),
      ...buckets.today.filter((t) => t.assignee?.gid === gid),
      ...buckets.thisWeek.filter((t) => t.assignee?.gid === gid),
    ];
    return items.slice(0, 6); // cap so the section stays compact
  };

  return (
    <section>
      <div className="flex items-baseline justify-between mb-4 sm:mb-5">
        <h2 className="text-base sm:text-lg font-heading font-bold tracking-tight">Side by side</h2>
        <span className="text-[10px] tracking-widest uppercase font-bold text-black/40 hidden sm:inline">
          who's holding the ball
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {top2.map((p) => {
          const isViewer = p.gid === viewerGid;
          const list = tasksFor(p.gid);
          return (
            <div
              key={p.gid}
              className={`bg-white border rounded-2xl p-5 sm:p-6 ${
                isViewer ? 'border-brand-blue/30 ring-1 ring-brand-blue/20' : 'border-black/5'
              }`}
            >
              <div className="flex items-baseline justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-heading font-bold tracking-tight">
                    {isViewer ? 'On your plate' : `${p.name.split(' ')[0]}'s plate`}
                  </h3>
                  {isViewer && (
                    <span className="text-[9px] tracking-widest uppercase font-bold text-brand-blue px-1.5 py-0.5 rounded bg-brand-blue/10">
                      You
                    </span>
                  )}
                </div>
                <div className="text-[11px] tracking-wide text-black/50">
                  {p.overdue > 0 && <span className="text-red-600 font-semibold">{p.overdue} overdue · </span>}
                  {p.total} open
                </div>
              </div>

              {list.length === 0 ? (
                <p className="text-sm text-black/40 italic">Nothing pressing this week.</p>
              ) : (
                <ul className="space-y-2">
                  {list.map((t) => {
                    const isOver = !!t.due && parseDateOnlyJs(t.due) < startOfTodayJs();
                    return (
                      <li key={t.gid}>
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#FAFAF7] smooth-transition"
                        >
                          <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                            isOver ? 'bg-red-500' :
                            (t.due && parseDateOnlyJs(t.due).getTime() === startOfTodayJs().getTime()) ? 'bg-brand-blue' :
                            'bg-black/20'
                          }`}></div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm leading-snug">{t.name}</div>
                            <div className="flex items-center gap-2 text-[11px] text-black/45 mt-0.5">
                              {t.projects?.[0] && <span className="truncate">{t.projects[0].name}</span>}
                              {t.due && (
                                <span className={`ml-auto whitespace-nowrap ${isOver ? 'text-red-600 font-semibold' : ''}`}>
                                  {formatDueDateShort(t.due)}
                                </span>
                              )}
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

function parseDateOnlyJs(yyyymmdd: string): Date {
  const [y, m, d] = yyyymmdd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDueDateShort(yyyymmdd: string): string {
  const d = parseDateOnlyJs(yyyymmdd);
  const today = startOfTodayJs();
  const diff = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < 0) return `${-diff}d late`;
  if (diff < 7) return d.toLocaleDateString(undefined, { weekday: 'short' });
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// ───────────────────────────────────────────────────────────────────────────
// Weekly Review modal

const WeeklyReview: React.FC<{
  data: TasksResponse;
  viewerGid: string | null;
  onClose: () => void;
}> = ({ data, viewerGid, onClose }) => {
  const wins = data.wins || [];
  const today = startOfTodayJs();
  const buckets = data.buckets;

  // What's slipping into next week (overdue + due in next 7 days)
  const slipping = buckets
    ? [...buckets.overdue, ...buckets.today, ...buckets.thisWeek]
    : [];

  // Stalled projects: at-risk and oldest age > 30
  const stalled = (data.clients || []).filter((c) => c.atRisk).slice(0, 6);

  // Wins broken out by person
  const winsByPerson = new Map<string, WinTask[]>();
  for (const w of wins) {
    const key = w.assignee?.gid || 'unassigned';
    if (!winsByPerson.has(key)) winsByPerson.set(key, []);
    winsByPerson.get(key)!.push(w);
  }

  const week = `${addDaysJs(today, -7).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl bg-[#FAFAF7] sm:rounded-3xl overflow-hidden flex flex-col max-h-screen sm:max-h-[88vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-8 border-b border-black/5 bg-white">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">Weekly review</div>
            <h2 className="text-xl sm:text-3xl font-heading font-extrabold tracking-tight">{week}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 smooth-transition"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scroll body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8">
          {/* Wins */}
          <section>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-heading font-bold tracking-tight">
                🎉 Wins this week
              </h3>
              <span className="text-xs tracking-widest uppercase font-bold text-black/40">
                {wins.length} done
              </span>
            </div>
            {wins.length === 0 ? (
              <p className="text-sm text-black/50 italic">No completed tasks recorded in the last 7 days.</p>
            ) : (
              <div className="space-y-4">
                {Array.from(winsByPerson.entries()).map(([key, items]) => (
                  <div key={key}>
                    <div className="text-[11px] tracking-widest uppercase font-bold text-black/40 mb-2">
                      {items[0]?.assignee?.name || 'Unassigned'} · {items.length}
                    </div>
                    <ul className="space-y-1">
                      {items.map((w) => (
                        <li key={w.gid}>
                          <a
                            href={w.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-black/75 hover:text-brand-blue smooth-transition"
                          >
                            <span className="text-green-600 mr-2">✓</span>
                            {w.name}
                            {w.projects?.[0] && (
                              <span className="text-black/40 text-xs ml-2">· {w.projects[0].name}</span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* What's slipping */}
          <section>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-heading font-bold tracking-tight">
                ⚠️ Carrying into next week
              </h3>
              <span className="text-xs tracking-widest uppercase font-bold text-black/40">
                {slipping.length} item{slipping.length === 1 ? '' : 's'}
              </span>
            </div>
            {slipping.length === 0 ? (
              <p className="text-sm text-black/50 italic">Nothing carried over. Clean slate.</p>
            ) : (
              <ul className="space-y-1">
                {slipping.slice(0, 10).map((t) => {
                  const isOver = !!t.due && parseDateOnlyJs(t.due) < startOfTodayJs();
                  return (
                    <li key={t.gid}>
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-brand-blue smooth-transition"
                      >
                        <span className={isOver ? 'text-red-500' : 'text-black/40'}>•</span>
                        <span className="flex-1">{t.name}</span>
                        <span className="text-xs text-black/40">
                          {t.assignee?.name?.split(' ')[0] || '—'}
                        </span>
                      </a>
                    </li>
                  );
                })}
                {slipping.length > 10 && (
                  <li className="text-xs text-black/40 italic pt-1">
                    + {slipping.length - 10} more
                  </li>
                )}
              </ul>
            )}
          </section>

          {/* Stalled projects */}
          {stalled.length > 0 && (
            <section>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-heading font-bold tracking-tight">
                  🐢 Projects to nudge
                </h3>
                <span className="text-xs tracking-widest uppercase font-bold text-black/40">
                  at risk
                </span>
              </div>
              <ul className="space-y-2">
                {stalled.map((c) => (
                  <li key={c.gid} className="flex items-baseline justify-between gap-3 p-3 bg-white border border-black/5 rounded-xl">
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                    <span className="text-xs text-black/50 whitespace-nowrap">
                      {c.overdue > 0 && <span className="text-red-600 font-semibold">{c.overdue} overdue · </span>}
                      oldest {c.oldestAgeDays}d
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

function addDaysJs(d: Date, days: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

const CapacityStrip: React.FC<{ rows: CapacityRow[]; viewerGid: string | null }> = ({ rows, viewerGid }) => {
  return (
    <section className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
      <div className="flex items-baseline justify-between mb-4 sm:mb-5">
        <h2 className="text-base sm:text-lg font-heading font-bold tracking-tight">Team capacity</h2>
        <span className="text-[10px] tracking-widest uppercase font-bold text-black/40 hidden sm:inline">
          open tasks per person
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((r) => {
          const isViewer = r.gid === viewerGid;
          return (
            <div
              key={r.gid}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                isViewer
                  ? 'bg-brand-blue/[0.04] border-brand-blue/30 ring-1 ring-brand-blue/20'
                  : 'bg-[#FAFAF7] border-black/5'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-bold tracking-tight truncate">{r.name}</div>
                  {isViewer && (
                    <span className="text-[9px] tracking-widest uppercase font-bold text-brand-blue px-1.5 py-0.5 rounded bg-brand-blue/10">You</span>
                  )}
                </div>
                <div className="text-[11px] tracking-wide text-black/50 mt-1">
                  {r.overdue > 0 && <span className="text-red-600 font-semibold">{r.overdue} overdue</span>}
                  {r.overdue > 0 && (r.today > 0 || r.thisWeek > 0) && <span> · </span>}
                  {r.today > 0 && <span className="text-brand-blue font-semibold">{r.today} today</span>}
                  {r.today > 0 && r.thisWeek > 0 && <span> · </span>}
                  {r.thisWeek > 0 && <span>{r.thisWeek} this week</span>}
                  {r.overdue === 0 && r.today === 0 && r.thisWeek === 0 && (
                    <span className="text-black/40">on track</span>
                  )}
                </div>
              </div>
              <div className="text-3xl font-heading font-extrabold text-brand-black ml-3 flex-shrink-0">
                {r.total}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ClientsGrid: React.FC<{ clients: ClientTile[] }> = ({ clients }) => {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-heading font-bold tracking-tight">Clients · Projects</h2>
        <span className="text-[10px] tracking-widest uppercase font-bold text-black/40">
          at-risk first
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {clients.map((c) => {
          const ringTone =
            c.overdue > 0 ? 'border-l-red-500' :
            c.today > 0 ? 'border-l-brand-blue' :
            c.atRisk ? 'border-l-amber-500' :
            'border-l-black/10';
          return (
            <div
              key={c.gid}
              className={`bg-white border border-black/5 ${ringTone} border-l-4 rounded-2xl p-5`}
            >
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <div className="text-sm font-bold tracking-tight leading-snug truncate" title={c.name}>
                  {c.name}
                </div>
                <div className="text-2xl font-heading font-extrabold text-brand-black flex-shrink-0">
                  {c.total}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] tracking-wide">
                {c.overdue > 0 && (
                  <span className="text-red-600 font-semibold">{c.overdue} overdue</span>
                )}
                {c.today > 0 && (
                  <span className="text-brand-blue font-semibold">{c.today} today</span>
                )}
                {c.upcoming > 0 && (
                  <span className="text-black/55">{c.upcoming} upcoming</span>
                )}
                {c.atRisk && c.overdue === 0 && (
                  <span className="text-amber-600 font-semibold">stalled · {c.oldestAgeDays}d old</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const TaskBucket: React.FC<{ title: string; tone: 'red' | 'blue' | 'neutral' | 'muted'; tasks: Task[] }> = ({ title, tone, tasks }) => {
  const borderTone =
    tone === 'red' ? 'border-l-red-500' :
    tone === 'blue' ? 'border-l-brand-blue' :
    tone === 'neutral' ? 'border-l-black/30' :
    'border-l-black/10';
  return (
    <div className={`bg-white border border-black/5 ${borderTone} border-l-4 rounded-2xl p-5 sm:p-6`}>
      <div className="flex items-baseline justify-between mb-4 sm:mb-5">
        <h2 className="text-base sm:text-lg font-heading font-bold tracking-tight">{title}</h2>
        <span className="text-[10px] tracking-widest uppercase font-bold text-black/40">{tasks.length}</span>
      </div>
      {tasks.length === 0 ? (
        <p className="text-sm text-black/40 italic">Nothing here. 🎉</p>
      ) : (
        <ul className="space-y-2 sm:space-y-3">
          {tasks.map((t) => <TaskRow key={t.gid} task={t} />)}
        </ul>
      )}
    </div>
  );
};

const TaskRow: React.FC<{ task: Task }> = ({ task }) => {
  const projectName = task.projects?.[0]?.name;
  return (
    <li className="group">
      <a
        href={task.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 -mx-3 rounded-xl hover:bg-[#FAFAF7] smooth-transition"
      >
        <div className="font-medium text-sm leading-snug mb-1">{task.name}</div>
        <div className="flex items-center gap-3 text-[11px] tracking-wide text-black/50">
          {task.assignee && <span className="font-semibold">{task.assignee.name}</span>}
          {projectName && <span className="truncate">· {projectName}</span>}
          {task.due && <span className="ml-auto whitespace-nowrap">{formatDueDate(task.due)}</span>}
        </div>
      </a>
    </li>
  );
};

const QuickAdd: React.FC<{ meta: MetaResponse; onCreated: () => void; viewer: CapacityRow | null }> = ({ meta, onCreated, viewer }) => {
  const [name, setName] = useState('');
  // Default assignee to whoever is viewing (handy for "add a task for myself")
  const [assigneeGid, setAssigneeGid] = useState(viewer?.gid || '');
  const [projectGid, setProjectGid] = useState('');
  const [dueOn, setDueOn] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Keep assignee in sync if the viewer changes
  useEffect(() => {
    if (viewer && !assigneeGid) setAssigneeGid(viewer.gid);
  }, [viewer]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus('sending');
    setMessage('');
    try {
      const resp = await fetch('/api/dashboard/create-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: name.trim(),
          assigneeGid: assigneeGid || undefined,
          projectGid: projectGid || undefined,
          dueOn: dueOn || undefined,
          notes: notes.trim() || undefined,
        }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.ok) throw new Error(json.error || 'Failed');
      setStatus('success');
      setMessage(`Created · ${json.task.name}`);
      setName('');
      setNotes('');
      setDueOn('');
      onCreated();
      setTimeout(() => setStatus('idle'), 2200);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const shortcuts: { label: string; value: () => string }[] = [
    { label: 'Today', value: () => isoDateOffset(0) },
    { label: 'Tomorrow', value: () => isoDateOffset(1) },
    { label: 'Friday', value: () => isoNextWeekday(5) },
    { label: 'Next week', value: () => isoDateOffset(7) },
  ];

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-baseline justify-between mb-4 sm:mb-5 gap-3">
        <h2 className="text-base sm:text-lg font-heading font-bold tracking-tight">
          Quick add
          <span className="hidden sm:inline text-xs font-normal text-black/40 ml-2">— creates a task in Asana</span>
        </h2>
        {status === 'success' && (
          <span className="text-xs text-green-700 font-semibold truncate">✓ {message}</span>
        )}
        {status === 'error' && (
          <span className="text-xs text-red-600 font-semibold truncate">{message}</span>
        )}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="What needs to happen?"
          className="w-full px-4 py-3.5 sm:py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          <select
            value={assigneeGid}
            onChange={(e) => setAssigneeGid(e.target.value)}
            className="px-4 py-3.5 sm:py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
          >
            <option value="">Assignee · anyone</option>
            {(meta.users || []).map((u) => (
              <option key={u.gid} value={u.gid}>{u.name}{u.gid === viewer?.gid ? ' (me)' : ''}</option>
            ))}
          </select>

          <select
            value={projectGid}
            onChange={(e) => setProjectGid(e.target.value)}
            className="px-4 py-3.5 sm:py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
          >
            <option value="">Project · none</option>
            {(meta.projects || []).map((p) => (
              <option key={p.gid} value={p.gid}>{p.name}</option>
            ))}
          </select>

          <input
            type="date"
            value={dueOn}
            onChange={(e) => setDueOn(e.target.value)}
            className="px-4 py-3.5 sm:py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {shortcuts.map((s) => (
            <button
              type="button"
              key={s.label}
              onClick={() => setDueOn(s.value())}
              className="px-3 py-2 text-[11px] font-bold tracking-widest uppercase text-black/60 border border-black/10 rounded-full hover:border-brand-blue hover:text-brand-blue active:bg-brand-blue/5 smooth-transition"
            >
              {s.label}
            </button>
          ))}
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Notes (optional)"
          className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition resize-none"
        />

        <button
          type="submit"
          disabled={status === 'sending' || !name.trim()}
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 active:bg-blue-700 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-brand-blue/20"
        >
          {status === 'sending' ? 'Adding…' : 'Add to Asana'}
        </button>
      </form>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Helpers

function formatDueDate(yyyymmdd: string): string {
  const [y, m, d] = yyyymmdd.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < 0) return `${-diff}d overdue`;
  if (diff < 7) return date.toLocaleDateString(undefined, { weekday: 'short' });
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function isoDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function isoNextWeekday(targetDay: number): string {
  // targetDay: 0=Sun, 1=Mon, ..., 5=Fri
  const d = new Date();
  const diff = (targetDay - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}
