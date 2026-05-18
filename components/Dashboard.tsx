
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

interface TasksResponse {
  ok: boolean;
  me?: { gid: string; name: string; email: string };
  workspaceGid?: string;
  counts?: Record<string, number>;
  buckets?: Buckets;
  clients?: ClientTile[];
  capacity?: CapacityRow[];
  error?: string;
}

interface MetaResponse {
  ok: boolean;
  users?: { gid: string; name: string; email: string }[];
  projects?: { gid: string; name: string }[];
  error?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [data, setData] = useState<TasksResponse | null>(null);
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <DashboardHome
      data={data}
      meta={meta}
      onRefresh={loadTasks}
      refreshing={refreshing}
      error={error}
      onBack={onBack}
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
}> = ({ data, meta, onRefresh, refreshing, error, onBack }) => {
  const buckets = data?.buckets;
  const counts = data?.counts;

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-brand-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/DFB Blue Logomark Tight.png" alt="DFB Digital" className="h-8 w-auto" />
            <span className="text-xs tracking-widest uppercase text-black/50 font-bold">Dashboard</span>
          </div>
          <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-black/50 font-medium">
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="hover:text-brand-blue smooth-transition disabled:opacity-50"
            >
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
            <button onClick={onBack} className="hover:text-brand-blue smooth-transition">Main site</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            {error}
          </div>
        )}

        {/* Counts strip */}
        {counts && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Overdue" value={counts.overdue} accent="red" />
            <Stat label="Today" value={counts.today} accent="blue" />
            <Stat label="This week" value={counts.thisWeek} accent="black" />
            <Stat label="Upcoming" value={counts.upcoming} accent="muted" />
          </div>
        )}

        {/* Team capacity */}
        {data?.capacity && data.capacity.length > 0 && (
          <CapacityStrip rows={data.capacity} />
        )}

        {/* Clients */}
        {data?.clients && data.clients.length > 0 && (
          <ClientsGrid clients={data.clients} />
        )}

        {/* Quick-add */}
        {meta && <QuickAdd meta={meta} onCreated={onRefresh} />}

        {/* Lists */}
        {buckets && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskBucket title="Overdue" tone="red" tasks={buckets.overdue} />
            <TaskBucket title="Due today" tone="blue" tasks={buckets.today} />
            <TaskBucket title="This week" tone="neutral" tasks={buckets.thisWeek} />
            <TaskBucket title="Upcoming" tone="muted" tasks={buckets.upcoming} />
          </div>
        )}
      </main>
    </div>
  );
};

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

const CapacityStrip: React.FC<{ rows: CapacityRow[] }> = ({ rows }) => {
  return (
    <section className="bg-white border border-black/5 rounded-2xl p-6">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-heading font-bold tracking-tight">Team capacity</h2>
        <span className="text-[10px] tracking-widest uppercase font-bold text-black/40">
          open tasks per person
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((r) => (
          <div key={r.gid} className="flex items-center justify-between p-4 rounded-xl bg-[#FAFAF7] border border-black/5">
            <div className="min-w-0">
              <div className="text-sm font-bold tracking-tight truncate">{r.name}</div>
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
        ))}
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
    <div className={`bg-white border border-black/5 ${borderTone} border-l-4 rounded-2xl p-6`}>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-heading font-bold tracking-tight">{title}</h2>
        <span className="text-[10px] tracking-widest uppercase font-bold text-black/40">{tasks.length}</span>
      </div>
      {tasks.length === 0 ? (
        <p className="text-sm text-black/40 italic">Nothing here. 🎉</p>
      ) : (
        <ul className="space-y-3">
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

const QuickAdd: React.FC<{ meta: MetaResponse; onCreated: () => void }> = ({ meta, onCreated }) => {
  const [name, setName] = useState('');
  const [assigneeGid, setAssigneeGid] = useState('');
  const [projectGid, setProjectGid] = useState('');
  const [dueOn, setDueOn] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
    <div className="bg-white border border-black/5 rounded-2xl p-6">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-heading font-bold tracking-tight">Quick add</h2>
        {status === 'success' && (
          <span className="text-xs text-green-700 font-semibold">{message}</span>
        )}
        {status === 'error' && (
          <span className="text-xs text-red-600 font-semibold">{message}</span>
        )}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="What needs to happen?"
          className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={assigneeGid}
            onChange={(e) => setAssigneeGid(e.target.value)}
            className="px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
          >
            <option value="">Assignee · anyone</option>
            {(meta.users || []).map((u) => (
              <option key={u.gid} value={u.gid}>{u.name}</option>
            ))}
          </select>

          <select
            value={projectGid}
            onChange={(e) => setProjectGid(e.target.value)}
            className="px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
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
            className="px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {shortcuts.map((s) => (
            <button
              type="button"
              key={s.label}
              onClick={() => setDueOn(s.value())}
              className="px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase text-black/60 border border-black/10 rounded-full hover:border-brand-blue hover:text-brand-blue smooth-transition"
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
          className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition resize-none"
        />

        <button
          type="submit"
          disabled={status === 'sending' || !name.trim()}
          className="px-6 py-3 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
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
