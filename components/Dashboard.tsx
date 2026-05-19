
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

interface TimesheetResponse {
  ok: boolean;
  connected?: boolean;
  needsReconnect?: boolean;
  todayHours?: number;
  weekHours?: number;
  lifetimeHours?: number;
  cumulativeSincePing?: number;
  lifetimeAtLastPing?: number;
  lastPingedAt?: number | null;
  todayEntries?: { task: string; duration: string; hours: number }[];
  crossedThreshold?: boolean;
  error?: string;
}

interface DateEntry {
  id: string;
  name: string;
  monthDay: string; // "MM-DD"
  type: string;     // 'birthday' | 'anniversary' | 'contract-start' | 'other'
  notes: string;
  createdAt: number;
}

interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  location: string;
  htmlLink: string;
  allDay: boolean;
  attendees: number;
}

interface CalendarResponse {
  ok: boolean;
  connected: boolean;
  email?: string;
  month?: string; // "YYYY-MM"
  events?: CalendarEvent[];
  needsReconnect?: boolean;
  error?: string;
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
  const [allClientsOpen, setAllClientsOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [notesProject, setNotesProject] = useState<ClientTile | null>(null);
  const [dates, setDates] = useState<DateEntry[]>([]);
  const [datesOpen, setDatesOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [timesheet, setTimesheet] = useState<TimesheetResponse | null>(null);

  const loadTimesheet = useCallback(async (gid: string) => {
    try {
      const resp = await fetch(`/api/dashboard/timesheet?viewerGid=${encodeURIComponent(gid)}`, {
        credentials: 'include',
      });
      const json: TimesheetResponse = await resp.json();
      setTimesheet(json);
    } catch {
      setTimesheet({ ok: false, error: 'Failed to fetch timesheet' });
    }
  }, []);

  useEffect(() => {
    if (viewerGid) loadTimesheet(viewerGid);
  }, [viewerGid, loadTimesheet]);

  // Auto-ping Joe when 6 cumulative unbilled hours has been crossed.
  // After ping, the backend bumps the baseline → cumulativeSincePing resets
  // to 0 → next 6h triggers the next ping.
  useEffect(() => {
    if (!viewerGid || !viewer) return;
    if (!timesheet?.ok || !timesheet.connected) return;
    if (!timesheet.crossedThreshold) return;
    const cumulative = Number(timesheet.cumulativeSincePing || 0);
    if (cumulative < 6) return;

    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch('/api/dashboard/timesheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            viewerGid,
            viewerName: viewer.name,
            cumulativeHours: cumulative,
            lifetimeHours: timesheet.lifetimeHours,
          }),
        });
        const json = await resp.json();
        if (cancelled) return;
        if (json.ok) {
          // Reset cumulative locally so the UI matches the new baseline
          setTimesheet((prev) =>
            prev
              ? {
                  ...prev,
                  cumulativeSincePing: 0,
                  lifetimeAtLastPing: json.newLifetimeAtLastPing ?? prev.lifetimeHours,
                  lastPingedAt: json.pingedAt,
                  crossedThreshold: false,
                }
              : prev
          );
        }
      } catch {
        // best-effort
      }
    })();
    return () => { cancelled = true; };
  }, [viewerGid, viewer, timesheet]);

  const loadDates = useCallback(async () => {
    try {
      const resp = await fetch('/api/dashboard/dates', { credentials: 'include' });
      const json = await resp.json();
      if (json.ok) setDates(Array.isArray(json.entries) ? json.entries : []);
    } catch {
      // ignore — feature is best-effort
    }
  }, []);

  useEffect(() => {
    if (viewerGid) loadDates();
  }, [viewerGid, loadDates]);

  // Google Calendar state — fetched per viewer
  const [calendar, setCalendar] = useState<CalendarResponse | null>(null);
  const [calStatus, setCalStatus] = useState<'connected' | 'error' | null>(null);
  const [calMonth, setCalMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  const loadCalendar = useCallback(async (gid: string, month?: string) => {
    try {
      const params = new URLSearchParams({ viewerGid: gid });
      if (month) params.set('month', month);
      const resp = await fetch(`/api/dashboard/calendar/events?${params.toString()}`, {
        credentials: 'include',
      });
      const json: CalendarResponse = await resp.json();
      setCalendar(json);
    } catch {
      setCalendar({ ok: false, connected: false, error: 'Failed to fetch calendar' });
    }
  }, []);

  useEffect(() => {
    if (viewerGid) loadCalendar(viewerGid, calMonth);
  }, [viewerGid, calMonth, loadCalendar]);

  // Handle OAuth callback redirect status banners
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get('cal_connected');
    const calError = params.get('cal_error');
    if (connected) {
      setCalStatus('connected');
      // clear URL
      window.history.replaceState({}, '', window.location.pathname);
      if (viewerGid) loadCalendar(viewerGid, calMonth);
      setTimeout(() => setCalStatus(null), 4000);
    } else if (calError) {
      setCalStatus('error');
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setCalStatus(null), 5000);
    }
  }, [viewerGid, calMonth, loadCalendar]);

  const connectCalendar = () => {
    if (!viewerGid) return;
    window.location.href = `/api/dashboard/calendar/authorize?viewerGid=${encodeURIComponent(viewerGid)}`;
  };

  const disconnectCalendar = async () => {
    if (!viewerGid) return;
    if (!window.confirm('Disconnect Google Calendar from this dashboard? You can reconnect anytime.')) return;
    await fetch(`/api/dashboard/calendar/disconnect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ viewerGid }),
    });
    setCalendar({ ok: true, connected: false });
  };

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
              onClick={() => setAddClientOpen(true)}
              className="hover:text-brand-blue smooth-transition"
              title="Add a new client"
            >
              + Client
            </button>
            <button
              onClick={() => setIntakeOpen(true)}
              className="hover:text-brand-blue smooth-transition"
              title="Send intake form"
            >
              Send Intake
            </button>
            <button
              onClick={() => setDatesOpen(true)}
              className="hover:text-brand-blue smooth-transition"
              title="Birthdays + anniversaries"
            >
              Dates
            </button>
            <button
              onClick={() => setTimeOpen(true)}
              className="hover:text-brand-blue smooth-transition"
              title="Log hours + ping Joe"
            >
              Time
            </button>
            <button
              onClick={() => setAllClientsOpen(true)}
              className="hover:text-brand-blue smooth-transition"
              title="All clients"
            >
              Clients
            </button>
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

        {/* Calendar OAuth status toasts */}
        {calStatus === 'connected' && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-3 text-sm">
            ✓ Google Calendar connected.
          </div>
        )}
        {calStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-sm">
            Calendar connection failed. Try again or check the OAuth setup.
          </div>
        )}

        {/* Good morning — personalized greeting */}
        {viewer && buckets && (
          <Greeting
            viewer={viewer}
            buckets={buckets}
            dates={dates}
            timesheet={timesheet}
            onChangeViewer={onChangeViewer}
          />
        )}

        {/* Calendar — monthly view */}
        {viewerGid && calendar && (
          <CalendarMonth
            calendar={calendar}
            month={calMonth}
            onMonthChange={setCalMonth}
            onConnect={connectCalendar}
            onDisconnect={disconnectCalendar}
            viewerGid={viewerGid}
            onEventCreated={() => loadCalendar(viewerGid, calMonth)}
          />
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
          <ClientsGrid
            clients={data.clients}
            onOpenNotes={(client) => setNotesProject(client)}
          />
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

      {/* All Clients modal */}
      {allClientsOpen && data && (
        <AllClientsView
          data={data}
          onClose={() => setAllClientsOpen(false)}
        />
      )}

      {/* Add Client modal */}
      {addClientOpen && (
        <AddClientModal
          meta={meta}
          viewer={viewer}
          onClose={() => setAddClientOpen(false)}
          onCreated={() => {
            setAddClientOpen(false);
            onRefresh();
          }}
        />
      )}

      {/* Send Intake modal */}
      {intakeOpen && (
        <SendIntakeModal onClose={() => setIntakeOpen(false)} />
      )}

      {/* Notes drawer */}
      {notesProject && viewer && (
        <NotesDrawer
          project={notesProject}
          viewerName={viewer.name}
          onClose={() => setNotesProject(null)}
        />
      )}

      {/* Dates manager modal */}
      {datesOpen && (
        <DatesManager
          dates={dates}
          onClose={() => setDatesOpen(false)}
          onChanged={loadDates}
        />
      )}

      {/* Time tracker / ping Joe modal */}
      {timeOpen && (
        <TimeTrackerModal
          viewer={viewer}
          timesheet={timesheet}
          viewerGid={viewerGid}
          onClose={() => setTimeOpen(false)}
          onCounterChanged={() => {
            if (viewerGid) loadTimesheet(viewerGid);
          }}
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
  dates: DateEntry[];
  timesheet: TimesheetResponse | null;
  onChangeViewer: () => void;
}> = ({ viewer, buckets, dates, timesheet, onChangeViewer }) => {
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

      {/* Time tracker — cumulative since last invoice ping */}
      {timesheet?.ok && timesheet.connected && typeof timesheet.cumulativeSincePing === 'number' && (
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold border ${
            timesheet.cumulativeSincePing >= 6
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-brand-blue/5 border-brand-blue/20 text-brand-blue'
          }`}>
            💰&nbsp; {timesheet.cumulativeSincePing.toFixed(1)}h since last invoice
            {typeof timesheet.todayHours === 'number' && timesheet.todayHours > 0 && (
              <span className="text-brand-blue/70 font-medium">· {timesheet.todayHours.toFixed(1)}h today</span>
            )}
          </span>
          {timesheet.crossedThreshold && timesheet.cumulativeSincePing >= 6 && (
            <span className="text-[11px] tracking-wide text-amber-700 font-semibold">
              🎉 Hit 6 unbilled hours — pinging Joe…
            </span>
          )}
          {timesheet.lastPingedAt && timesheet.cumulativeSincePing < 6 && (
            <span className="text-[11px] tracking-wide text-black/45">
              Last invoice ping: {formatPingedAt(timesheet.lastPingedAt)}
            </span>
          )}
        </div>
      )}

      {/* Upcoming dates (birthdays + anniversaries in next 14 days) */}
      {(() => {
        const upcoming = upcomingDates(dates, 14);
        if (upcoming.length === 0) return null;
        return (
          <div className="mb-5 flex flex-wrap gap-2">
            {upcoming.slice(0, 3).map((d) => (
              <span
                key={d.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-[12px]"
                title={d.notes || ''}
              >
                <span>{emojiForType(d.type)}</span>
                <span className="font-semibold text-amber-900">{d.name}</span>
                <span className="text-amber-700">· {dateLabelForUpcoming(d.monthDay)}</span>
              </span>
            ))}
          </div>
        );
      })()}

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

function formatPingedAt(ts: number): string {
  const d = new Date(ts);
  const today = startOfTodayJs();
  const sameDay = d >= today;
  if (sameDay) {
    return `today at ${d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`;
  }
  const diffDays = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function daysUntilMonthDay(monthDay: string): number {
  // monthDay = "MM-DD" — returns # of days from today until next occurrence
  const [m, d] = monthDay.split('-').map(Number);
  if (!m || !d) return 9999;
  const today = startOfTodayJs();
  const thisYear = new Date(today.getFullYear(), m - 1, d);
  if (thisYear >= today) {
    return Math.round((thisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }
  const nextYear = new Date(today.getFullYear() + 1, m - 1, d);
  return Math.round((nextYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function upcomingDates(entries: DateEntry[], withinDays: number): (DateEntry & { _daysAway: number })[] {
  return entries
    .map((e) => ({ ...e, _daysAway: daysUntilMonthDay(e.monthDay) }))
    .filter((e) => e._daysAway <= withinDays)
    .sort((a, b) => a._daysAway - b._daysAway);
}

function emojiForType(type: string): string {
  switch (type) {
    case 'birthday': return '🎂';
    case 'anniversary': return '💐';
    case 'contract-start': return '🤝';
    default: return '📅';
  }
}

function dateLabelForUpcoming(monthDay: string): string {
  const days = daysUntilMonthDay(monthDay);
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days < 7) return `in ${days}d`;
  const [m, d] = monthDay.split('-').map(Number);
  return new Date(2000, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
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
// Monthly Calendar — Google Calendar overlay

const CalendarMonth: React.FC<{
  calendar: CalendarResponse;
  month: string; // "YYYY-MM"
  onMonthChange: (next: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  viewerGid: string;
  onEventCreated: () => void;
}> = ({ calendar, month, onMonthChange, onConnect, onDisconnect, viewerGid, onEventCreated }) => {
  // Selected day (defaults to today if visible in this month, otherwise the 1st)
  const todayKey = startOfTodayJs().toISOString().slice(0, 10);
  const [selectedKey, setSelectedKey] = useState<string>(todayKey);
  const [addOpen, setAddOpen] = useState(false);

  // Reset selection when month changes
  useEffect(() => {
    const [y, m] = month.split('-').map(Number);
    const [ty, tm] = todayKey.split('-').map(Number);
    if (y === ty && m === tm) setSelectedKey(todayKey);
    else setSelectedKey(`${month}-01`);
  }, [month, todayKey]);

  // Not connected → CTA card
  if (!calendar.connected) {
    return (
      <section className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-heading font-bold tracking-tight">📅 Connect Google Calendar</h2>
            <p className="text-sm text-black/55 mt-1 max-w-xl">
              See your meetings alongside your tasks so you don't double-book. Read-only — we never edit your calendar.
              {calendar.needsReconnect && ' Your previous connection expired — please reconnect.'}
            </p>
          </div>
          <button
            onClick={onConnect}
            className="px-5 py-3 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition shadow-sm shadow-brand-blue/20"
          >
            {calendar.needsReconnect ? 'Reconnect' : 'Connect calendar'}
          </button>
        </div>
      </section>
    );
  }

  const [yearStr, monthStr] = month.split('-');
  const year = parseInt(yearStr, 10);
  const monthIdx = parseInt(monthStr, 10) - 1;
  const monthName = new Date(year, monthIdx, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  // Build a 6-week grid starting from the Sunday on or before the 1st
  const first = new Date(year, monthIdx, 1);
  const gridStart = new Date(first);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const days: { date: Date; key: string; inMonth: boolean; isToday: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({
      date: d,
      key,
      inMonth: d.getMonth() === monthIdx,
      isToday: key === todayKey,
    });
  }

  // Group events by day key
  const events = calendar.events || [];
  const eventsByDay = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    if (!e.start) continue;
    const key = e.start.slice(0, 10);
    if (!eventsByDay.has(key)) eventsByDay.set(key, []);
    eventsByDay.get(key)!.push(e);
  }

  // Month navigation
  const stepMonth = (delta: number) => {
    const d = new Date(year, monthIdx + delta, 1);
    onMonthChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  };
  const goToday = () => {
    const t = new Date();
    onMonthChange(`${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}`);
    setSelectedKey(todayKey);
  };

  const selectedEvents = (eventsByDay.get(selectedKey) || []).sort((a, b) =>
    (a.start || '').localeCompare(b.start || '')
  );

  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className="bg-white border border-black/5 rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-heading font-bold tracking-tight">📅 {monthName}</h2>
          {calendar.email && (
            <div className="text-[11px] tracking-wide text-black/40 mt-0.5 truncate">{calendar.email}</div>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => setAddOpen(true)}
            className="px-3 sm:px-4 py-1.5 bg-brand-blue text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition"
          >
            + Add
          </button>
          <button
            onClick={() => stepMonth(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-black/60 hover:bg-black/5 hover:text-brand-blue smooth-transition"
            aria-label="Previous month"
          >
            ‹
          </button>
          <button
            onClick={goToday}
            className="px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-black/60 border border-black/10 rounded-full hover:border-brand-blue hover:text-brand-blue smooth-transition"
          >
            Today
          </button>
          <button
            onClick={() => stepMonth(1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-black/60 hover:bg-black/5 hover:text-brand-blue smooth-transition"
            aria-label="Next month"
          >
            ›
          </button>
          <button
            onClick={onDisconnect}
            className="hidden sm:inline ml-2 text-[10px] tracking-widest uppercase text-black/40 hover:text-red-600 smooth-transition whitespace-nowrap"
            title="Disconnect Google Calendar"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 mb-1">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-black/40 text-center py-1.5"
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label[0]}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {days.map((d) => {
          const dayEvents = eventsByDay.get(d.key) || [];
          const isSelected = d.key === selectedKey;
          const dim = !d.inMonth;
          return (
            <button
              key={d.key}
              onClick={() => setSelectedKey(d.key)}
              className={`relative aspect-square sm:aspect-auto sm:min-h-[68px] p-1 sm:p-2 rounded-lg sm:rounded-xl text-left smooth-transition border ${
                isSelected
                  ? 'bg-brand-blue/[0.05] border-brand-blue/40 ring-1 ring-brand-blue/30'
                  : d.isToday
                  ? 'bg-brand-blue/[0.03] border-brand-blue/15'
                  : 'bg-[#FAFAF7] border-transparent hover:bg-white hover:border-black/10'
              } ${dim ? 'opacity-40' : ''}`}
            >
              <div className={`text-xs sm:text-sm font-bold leading-none ${d.isToday ? 'text-brand-blue' : ''}`}>
                {d.date.getDate()}
              </div>

              {/* Desktop: show up to 2 event titles */}
              <div className="hidden sm:block mt-1.5 space-y-0.5">
                {dayEvents.slice(0, 2).map((e) => (
                  <div
                    key={e.id}
                    className="text-[10px] leading-tight truncate text-brand-blue bg-brand-blue/[0.08] rounded px-1 py-0.5"
                    title={e.summary}
                  >
                    {!e.allDay && <span className="font-semibold mr-1">{formatEventTimeShort(e)}</span>}
                    {e.summary}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[9px] text-black/45 px-1">+ {dayEvents.length - 2} more</div>
                )}
              </div>

              {/* Mobile: just dots */}
              <div className="sm:hidden absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                {dayEvents.slice(0, 3).map((e, idx) => (
                  <span
                    key={e.id + idx}
                    className="w-1 h-1 rounded-full bg-brand-blue"
                  ></span>
                ))}
                {dayEvents.length > 3 && (
                  <span className="w-1 h-1 rounded-full bg-brand-blue/50"></span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day events */}
      <div className="mt-5 pt-5 border-t border-black/5">
        <div className="text-[11px] tracking-widest uppercase font-bold text-black/40 mb-3">
          {formatSelectedDayLabel(selectedKey, todayKey)}
        </div>
        {selectedEvents.length === 0 ? (
          <p className="text-sm text-black/50 italic">No meetings.</p>
        ) : (
          <ul className="space-y-2">
            {selectedEvents.map((e) => (
              <li key={e.id}>
                <a
                  href={e.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF7] hover:bg-brand-blue/[0.04] border border-transparent hover:border-brand-blue/20 smooth-transition"
                >
                  <div className="flex-shrink-0 w-16 sm:w-20 text-xs font-bold tracking-tight text-brand-blue tabular-nums">
                    {formatEventTime(e)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm leading-snug truncate">{e.summary}</div>
                    <div className="flex items-center gap-2 text-[11px] text-black/45 mt-0.5">
                      {e.location && <span className="truncate">{e.location}</span>}
                      {e.attendees > 1 && <span>{e.attendees} ppl</span>}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile disconnect (header hides it on small) */}
      <div className="sm:hidden mt-4 pt-4 border-t border-black/5 text-right">
        <button
          onClick={onDisconnect}
          className="text-[10px] tracking-widest uppercase text-black/40 hover:text-red-600 smooth-transition"
        >
          Disconnect Calendar
        </button>
      </div>

      {/* Add event modal */}
      {addOpen && (
        <AddEventModal
          viewerGid={viewerGid}
          defaultDate={selectedKey}
          onClose={() => setAddOpen(false)}
          onCreated={() => {
            setAddOpen(false);
            onEventCreated();
          }}
        />
      )}
    </section>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Add Event modal

const AddEventModal: React.FC<{
  viewerGid: string;
  defaultDate: string; // "YYYY-MM-DD"
  onClose: () => void;
  onCreated: () => void;
}> = ({ viewerGid, defaultDate, onClose, onCreated }) => {
  // Default start: next round hour today (or noon if it's tomorrow+)
  const defaultStartTime = () => {
    const now = new Date();
    if (defaultDate === todayKeyJs()) {
      const h = now.getHours() + 1;
      return `${String(Math.min(h, 23)).padStart(2, '0')}:00`;
    }
    return '09:00';
  };
  const defaultEndTime = (start: string) => {
    const [h, m] = start.split(':').map(Number);
    return `${String(Math.min(h + 1, 23)).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState(defaultStartTime());
  const [endTime, setEndTime] = useState(defaultEndTime(defaultStartTime()));
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [needsReconnect, setNeedsReconnect] = useState(false);

  // Auto-update end time when start changes
  const onStartChange = (val: string) => {
    setStartTime(val);
    setEndTime(defaultEndTime(val));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setStatus('sending');
    setErrorMsg('');
    setNeedsReconnect(false);

    try {
      let body: Record<string, unknown> = {
        viewerGid,
        summary: title.trim(),
        location: location.trim(),
        description: notes.trim(),
        allDay,
      };

      if (allDay) {
        // Google's all-day events use exclusive end date (next day)
        const startDate = date;
        const endDateObj = new Date(date + 'T00:00:00');
        endDateObj.setDate(endDateObj.getDate() + 1);
        const endDate = endDateObj.toISOString().slice(0, 10);
        body.start = startDate;
        body.end = endDate;
      } else {
        // Build local-time ISO with timezone offset
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        body.start = `${date}T${startTime}:00`;
        body.end = `${date}T${endTime}:00`;
        body.timeZone = tz;
      }

      const resp = await fetch('/api/dashboard/calendar/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const json = await resp.json();
      if (!json.ok) {
        if (json.needsReconnect) setNeedsReconnect(true);
        throw new Error(json.error || 'Failed to create event');
      }
      onCreated();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to create event');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white sm:rounded-3xl overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh] shadow-2xl">
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-black/5">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">New event</div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight">Add to calendar</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 smooth-transition"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={submit} className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
              placeholder="e.g. Call with Reyes Medical"
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="w-4 h-4 accent-brand-blue"
            />
            All-day event
          </label>

          {!allDay && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">Start</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => onStartChange(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">End</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Optional"
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Optional"
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {needsReconnect ? (
                <>
                  <div className="font-semibold mb-1">Calendar needs to be reconnected.</div>
                  <div className="text-xs">We expanded permissions to allow adding events. Disconnect and reconnect Google Calendar to grant write access.</div>
                </>
              ) : (
                errorMsg
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={status === 'sending' || !title.trim()}
              className="px-6 py-3.5 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex-1 shadow-sm shadow-brand-blue/20"
            >
              {status === 'sending' ? 'Adding…' : 'Add to Google Calendar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-brand-blue smooth-transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function todayKeyJs(): string {
  const d = startOfTodayJs();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ───────────────────────────────────────────────────────────────────────────
// Send Intake modal — shares the DFB intake form via copy/email/share

const INTAKE_URL = 'https://dfbdigital.com/intake';
const INTAKE_FALLBACK_URL = 'https://form.jotform.com/261293633350050';

const SendIntakeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // older browsers — fall back to selecting an input
    }
  };

  const firstName = recipientName.trim().split(' ')[0] || 'there';
  const emailSubject = encodeURIComponent('Next step: DFB Digital intake form');
  const emailBody = encodeURIComponent(
    `Hi ${firstName},\n\nThanks for the chat. To officially get started, please take a few minutes to fill in our intake form here:\n\n${INTAKE_URL}\n\nOnce we have your responses we'll be in touch within 1 business day to kick things off.\n\n— Joe\nDFB Digital`
  );
  const mailtoHref = `mailto:${encodeURIComponent(recipientEmail)}?subject=${emailSubject}&body=${emailBody}`;

  const smsBody = encodeURIComponent(
    `Hi ${firstName} — to get started with DFB Digital, fill in our intake form here: ${INTAKE_URL}`
  );
  const smsHref = `sms:?body=${smsBody}`;

  const nativeShare = async () => {
    if (typeof navigator === 'undefined' || !navigator.share) return;
    try {
      await navigator.share({
        title: 'DFB Digital — Intake Form',
        text: 'Fill in our intake form to get started',
        url: INTAKE_URL,
      });
    } catch {
      // user cancelled — ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-[#FAFAF7] sm:rounded-3xl overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-7 border-b border-black/5 bg-white">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">Onboarding</div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight">Send intake form</h2>
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

        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* Quick copy */}
          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">
              Branded link
            </label>
            <div className="flex items-center gap-2 bg-white border border-black/10 rounded-xl px-4 py-3">
              <code className="text-sm text-brand-black truncate flex-1">{INTAKE_URL}</code>
              <button
                onClick={() => copy(INTAKE_URL)}
                className="px-3 py-1.5 bg-brand-blue text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition whitespace-nowrap"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-[11px] text-black/45 mt-2">
              Same form, hosted on dfbdigital.com so the URL looks like ours.
              {' '}<button onClick={() => copy(INTAKE_FALLBACK_URL)} className="text-brand-blue hover:underline">Copy direct JotForm link instead</button>
            </p>
          </div>

          {/* Personalize and send */}
          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">
              Who's it for?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Their name (for the greeting)"
                className="px-4 py-3 bg-white border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
              />
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Their email"
                className="px-4 py-3 bg-white border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue smooth-transition"
              />
            </div>
            <p className="text-[11px] text-black/45 mt-2">
              These just pre-fill the email body — nothing is sent until you press the button.
            </p>
          </div>

          {/* Send options */}
          <div className="space-y-2">
            <a
              href={mailtoHref}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-xl smooth-transition ${
                recipientEmail
                  ? 'bg-brand-blue text-white hover:bg-blue-600 shadow-sm shadow-brand-blue/20'
                  : 'bg-white border border-black/10 text-black/55 pointer-events-none opacity-60'
              }`}
            >
              <span className="text-sm font-bold tracking-wide">
                ✉️&nbsp; Open in email{recipientName ? ` for ${recipientName.split(' ')[0]}` : ''}
              </span>
              <span className="text-[11px] tracking-widest uppercase opacity-80">Send</span>
            </a>

            <a
              href={smsHref}
              className="w-full flex items-center justify-between px-5 py-4 bg-white border border-black/10 hover:border-brand-blue hover:bg-brand-blue/[0.03] rounded-xl smooth-transition"
            >
              <span className="text-sm font-bold tracking-wide">💬&nbsp; Text it (mobile)</span>
              <span className="text-[11px] tracking-widest uppercase text-black/40">SMS</span>
            </a>

            {canNativeShare && (
              <button
                onClick={nativeShare}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border border-black/10 hover:border-brand-blue hover:bg-brand-blue/[0.03] rounded-xl smooth-transition"
              >
                <span className="text-sm font-bold tracking-wide">📤&nbsp; Share via…</span>
                <span className="text-[11px] tracking-widest uppercase text-black/40">Native</span>
              </button>
            )}

            <a
              href={INTAKE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-5 py-4 bg-white border border-black/10 hover:border-brand-blue hover:bg-brand-blue/[0.03] rounded-xl smooth-transition"
            >
              <span className="text-sm font-bold tracking-wide">👀&nbsp; Preview the form</span>
              <span className="text-[11px] tracking-widest uppercase text-black/40">Open</span>
            </a>
          </div>

          <p className="text-[11px] text-black/40 text-center pt-2">
            Submissions land in your JotForm dashboard (existing setup). Joe's notification settings there control who gets pinged.
          </p>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Add Client modal — creates a new Asana project (= new client)
// with optional onboarding template tasks.

interface TemplateTask {
  name: string;
  daysFromNow: number;
  assigneeGid: string;
}

const DEFAULT_TEMPLATE: TemplateTask[] = [
  { name: 'Send intake form to client',          daysFromNow: 1,  assigneeGid: '' },
  { name: 'Send + sign engagement letter',       daysFromNow: 3,  assigneeGid: '' },
  { name: 'Kickoff call scheduled',              daysFromNow: 7,  assigneeGid: '' },
  { name: 'Collect brand assets (logo, fonts)',  daysFromNow: 10, assigneeGid: '' },
  { name: 'Set up project folder + access',      daysFromNow: 7,  assigneeGid: '' },
  { name: 'Welcome email sent',                  daysFromNow: 1,  assigneeGid: '' },
  { name: 'First milestone defined',             daysFromNow: 14, assigneeGid: '' },
];

const AddClientModal: React.FC<{
  meta: MetaResponse | null;
  viewer: CapacityRow | null;
  onClose: () => void;
  onCreated: () => void;
}> = ({ meta, viewer, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [applyTemplate, setApplyTemplate] = useState(true);
  const [templateTasks, setTemplateTasks] = useState<TemplateTask[]>(
    DEFAULT_TEMPLATE.map((t) => ({ ...t, assigneeGid: viewer?.gid || '' }))
  );
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const updateTask = (idx: number, patch: Partial<TemplateTask>) => {
    setTemplateTasks((prev) => prev.map((t, i) => (i === idx ? { ...t, ...patch } : t)));
  };
  const removeTask = (idx: number) => {
    setTemplateTasks((prev) => prev.filter((_, i) => i !== idx));
  };
  const addTask = () => {
    setTemplateTasks((prev) => [...prev, { name: '', daysFromNow: 7, assigneeGid: viewer?.gid || '' }]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus('sending');
    setErrorMsg('');

    try {
      const cleanTasks = applyTemplate
        ? templateTasks
            .filter((t) => t.name.trim().length > 0)
            .map((t) => ({
              name: t.name.trim(),
              daysFromNow: Number.isFinite(Number(t.daysFromNow)) ? Number(t.daysFromNow) : 7,
              assigneeGid: t.assigneeGid || undefined,
            }))
        : [];

      const resp = await fetch('/api/dashboard/clients/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: name.trim(),
          notes: notes.trim(),
          applyTemplate,
          templateTasks: cleanTasks,
        }),
      });
      const json = await resp.json();
      if (!resp.ok || !json.ok) throw new Error(json.error || 'Failed to create client');
      onCreated();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to create client');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-[#FAFAF7] sm:rounded-3xl overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-8 border-b border-black/5 bg-white">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">New client</div>
            <h2 className="text-xl sm:text-3xl font-heading font-extrabold tracking-tight">Onboard a client</h2>
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

        {/* Body */}
        <form onSubmit={submit} className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
          {/* Client basics */}
          <section className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">
                Client / Project Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                placeholder="e.g. Reyes Medical Group"
                className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
              />
              <p className="text-[11px] text-black/45 mt-2">
                Creates a new Asana project with this name in your DFB workspace.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Industry, contact name, scope notes — anything Joe should see when he opens the project."
                className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition resize-none"
              />
            </div>
          </section>

          {/* Onboarding template */}
          <section>
            <label className="flex items-start gap-2 text-sm cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={applyTemplate}
                onChange={(e) => setApplyTemplate(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-brand-blue"
              />
              <span>
                <span className="font-bold">Apply onboarding template</span>
                <span className="block text-xs text-black/55 mt-0.5">
                  Seeds standard tasks in the new project so onboarding starts the same way every time.
                </span>
              </span>
            </label>

            {applyTemplate && (
              <div className="bg-white border border-black/5 rounded-2xl p-4 sm:p-5 space-y-2">
                {templateTasks.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => updateTask(idx, { name: e.target.value })}
                      placeholder="Task name"
                      className="flex-1 min-w-0 px-3 py-2 bg-[#FAFAF7] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-brand-blue smooth-transition"
                    />
                    <div className="flex items-center gap-1.5 flex-shrink-0 text-[11px] text-black/55">
                      <span>Due in</span>
                      <input
                        type="number"
                        value={t.daysFromNow}
                        onChange={(e) => updateTask(idx, { daysFromNow: Number(e.target.value) || 0 })}
                        className="w-12 px-1.5 py-2 bg-[#FAFAF7] border border-black/10 rounded-lg text-sm text-center text-brand-black focus:outline-none focus:border-brand-blue smooth-transition"
                        min="0"
                        max="365"
                      />
                      <span>days</span>
                    </div>
                    <select
                      value={t.assigneeGid}
                      onChange={(e) => updateTask(idx, { assigneeGid: e.target.value })}
                      className="w-28 flex-shrink-0 px-2 py-2 bg-[#FAFAF7] border border-black/10 rounded-lg text-xs focus:outline-none focus:border-brand-blue smooth-transition"
                    >
                      <option value="">unassigned</option>
                      {(meta?.users || []).map((u) => (
                        <option key={u.gid} value={u.gid}>
                          {u.name.split(' ')[0]}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTask(idx)}
                      className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full text-black/40 hover:text-red-600 hover:bg-red-50 smooth-transition"
                      aria-label="Remove task"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTask}
                  className="text-xs font-bold tracking-widest uppercase text-brand-blue hover:text-blue-700 smooth-transition mt-2"
                >
                  + Add task
                </button>
              </div>
            )}
          </section>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={status === 'sending' || !name.trim()}
              className="px-6 py-3.5 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex-1 shadow-sm shadow-brand-blue/20"
            >
              {status === 'sending' ? 'Creating…' : 'Create client'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-brand-blue smooth-transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function formatEventTime(e: CalendarEvent): string {
  if (e.allDay) return 'all day';
  try {
    const start = new Date(e.start);
    return start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  } catch {
    return '';
  }
}

function formatEventTimeShort(e: CalendarEvent): string {
  if (e.allDay) return '';
  try {
    const start = new Date(e.start);
    const h = start.getHours();
    const m = start.getMinutes();
    const ampm = h >= 12 ? 'p' : 'a';
    const hh = h % 12 || 12;
    return m === 0 ? `${hh}${ampm}` : `${hh}:${String(m).padStart(2, '0')}${ampm}`;
  } catch {
    return '';
  }
}

function formatSelectedDayLabel(selected: string, todayKey: string): string {
  if (!selected) return '';
  const [y, m, d] = selected.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const isToday = selected === todayKey;
  const label = date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  return isToday ? `Today · ${label}` : label;
}

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

// ───────────────────────────────────────────────────────────────────────────
// All Clients view — every client expanded with their tasks
//
// Used when you want to see the full agency picture at once instead of the
// compact tile grid on the home page. Sorted by risk (overdue first, then
// stalled, then by total open).

const AllClientsView: React.FC<{
  data: TasksResponse;
  onClose: () => void;
}> = ({ data, onClose }) => {
  const buckets = data.buckets;
  const clients = data.clients || [];

  // Build a flat list of all open tasks so we can filter per project
  const allOpen = buckets
    ? [...buckets.overdue, ...buckets.today, ...buckets.thisWeek, ...buckets.upcoming, ...buckets.noDate]
    : [];

  const tasksForProject = (projectGid: string) =>
    allOpen
      .filter((t) => t.projects?.some((p) => p.gid === projectGid))
      .sort((a, b) => {
        // overdue first, then due date asc, then no-date last
        const aDue = a.due || '9999-12-31';
        const bDue = b.due || '9999-12-31';
        return aDue.localeCompare(bDue);
      });

  // Roll up assignees per project for the "Working on it" line
  const assigneesForProject = (projectGid: string) => {
    const set = new Map<string, string>();
    for (const t of allOpen) {
      if (t.projects?.some((p) => p.gid === projectGid) && t.assignee) {
        set.set(t.assignee.gid, t.assignee.name);
      }
    }
    return Array.from(set.values());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-[#FAFAF7] sm:rounded-3xl overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-8 border-b border-black/5 bg-white">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">
              All clients · {clients.length}
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-extrabold tracking-tight">
              Every project at a glance
            </h2>
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

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-8">
          {clients.length === 0 ? (
            <p className="text-sm text-black/50 italic">No active projects with open tasks.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {clients.map((c) => {
                const tasks = tasksForProject(c.gid);
                const assignees = assigneesForProject(c.gid);
                const ringTone =
                  c.overdue > 0 ? 'border-l-red-500' :
                  c.today > 0 ? 'border-l-brand-blue' :
                  c.atRisk ? 'border-l-amber-500' :
                  'border-l-black/10';
                return (
                  <div
                    key={c.gid}
                    className={`bg-white border border-black/5 ${ringTone} border-l-4 rounded-2xl p-5 sm:p-6`}
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-3">
                      <h3 className="font-heading font-bold text-base sm:text-lg tracking-tight leading-snug truncate" title={c.name}>
                        {c.name}
                      </h3>
                      <div className="text-2xl font-heading font-extrabold text-brand-black flex-shrink-0">
                        {c.total}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] tracking-wide mb-3">
                      {c.overdue > 0 && <span className="text-red-600 font-semibold">{c.overdue} overdue</span>}
                      {c.today > 0 && <span className="text-brand-blue font-semibold">{c.today} today</span>}
                      {c.upcoming > 0 && <span className="text-black/55">{c.upcoming} upcoming</span>}
                      {c.atRisk && c.overdue === 0 && (
                        <span className="text-amber-600 font-semibold">stalled · {c.oldestAgeDays}d</span>
                      )}
                    </div>

                    {assignees.length > 0 && (
                      <div className="text-[11px] tracking-wide text-black/45 mb-4">
                        Working on it: <span className="text-black/65 font-medium">{assignees.join(', ')}</span>
                      </div>
                    )}

                    {tasks.length === 0 ? (
                      <p className="text-sm text-black/40 italic">No open tasks.</p>
                    ) : (
                      <ul className="space-y-2 border-t border-black/5 pt-3">
                        {tasks.slice(0, 8).map((t) => {
                          const isOver = !!t.due && parseDateOnlyJs(t.due) < startOfTodayJs();
                          return (
                            <li key={t.gid}>
                              <a
                                href={t.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#FAFAF7] smooth-transition"
                              >
                                <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${
                                  isOver ? 'bg-red-500' :
                                  (t.due && parseDateOnlyJs(t.due).getTime() === startOfTodayJs().getTime()) ? 'bg-brand-blue' :
                                  'bg-black/20'
                                }`}></div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm leading-snug">{t.name}</div>
                                  <div className="flex items-center gap-2 text-[11px] text-black/45 mt-0.5">
                                    {t.assignee && <span>{t.assignee.name.split(' ')[0]}</span>}
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
                        {tasks.length > 8 && (
                          <li className="text-[11px] text-black/40 italic pl-4">
                            + {tasks.length - 8} more
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

const ClientsGrid: React.FC<{
  clients: ClientTile[];
  onOpenNotes: (c: ClientTile) => void;
}> = ({ clients, onOpenNotes }) => {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-heading font-bold tracking-tight">Clients · Projects</h2>
        <span className="text-[10px] tracking-widest uppercase font-bold text-black/40">
          tap a tile for notes
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
            <button
              key={c.gid}
              onClick={() => onOpenNotes(c)}
              className={`text-left bg-white border border-black/5 ${ringTone} border-l-4 rounded-2xl p-5 hover:shadow-md hover:border-brand-blue/30 smooth-transition active:scale-[0.99]`}
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
              <div className="mt-3 text-[10px] tracking-widest uppercase text-black/35 font-bold">
                📝 Notes →
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Notes drawer — per-client scratchpad, auto-saves to Upstash on blur

const NotesDrawer: React.FC<{
  project: ClientTile;
  viewerName: string;
  onClose: () => void;
}> = ({ project, viewerName, onClose }) => {
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [updatedBy, setUpdatedBy] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'idle' | 'saving' | 'saved' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  // Load existing notes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch(
          `/api/dashboard/notes?projectGid=${encodeURIComponent(project.gid)}`,
          { credentials: 'include' }
        );
        const json = await resp.json();
        if (cancelled) return;
        if (!json.ok) throw new Error(json.error || 'Failed to load notes');
        setContent(json.content || '');
        setOriginalContent(json.content || '');
        setUpdatedAt(json.updatedAt);
        setUpdatedBy(json.updatedBy);
        setStatus('idle');
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err instanceof Error ? err.message : 'Failed to load');
          setStatus('error');
        }
      }
    })();
    return () => { cancelled = true; };
  }, [project.gid]);

  const save = useCallback(async () => {
    if (content === originalContent) return;
    setStatus('saving');
    setErrorMsg('');
    try {
      const resp = await fetch('/api/dashboard/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          projectGid: project.gid,
          content,
          viewerName,
        }),
      });
      const json = await resp.json();
      if (!json.ok) throw new Error(json.error || 'Save failed');
      setOriginalContent(content);
      setUpdatedAt(json.updatedAt);
      setUpdatedBy(json.updatedBy);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Save failed');
      setStatus('error');
    }
  }, [content, originalContent, project.gid, viewerName]);

  const isDirty = content !== originalContent;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full sm:max-w-lg bg-[#FAFAF7] flex flex-col h-screen shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-black/5 bg-white">
          <div className="min-w-0">
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">Notes · {project.name.length > 30 ? project.name.slice(0, 30) + '…' : project.name}</div>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold tracking-tight truncate">
              {project.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-black/45">
              <span>{project.total} open</span>
              {project.overdue > 0 && <span className="text-red-600 font-semibold">· {project.overdue} overdue</span>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-black/5 smooth-transition"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Save status strip */}
        <div className="px-5 sm:px-6 py-2 border-b border-black/5 bg-white text-[11px] tracking-wide flex items-center justify-between gap-2">
          <span className="text-black/45 min-w-0 truncate">
            {status === 'loading' && 'Loading…'}
            {status === 'saving' && 'Saving…'}
            {status === 'saved' && <span className="text-green-700 font-semibold">✓ Saved</span>}
            {status === 'error' && <span className="text-red-600 font-semibold">{errorMsg}</span>}
            {status === 'idle' && updatedAt && (
              <>Last edit {timeAgo(updatedAt)}{updatedBy ? ` by ${updatedBy.split(' ')[0]}` : ''}</>
            )}
            {status === 'idle' && !updatedAt && 'Start typing — saves on blur.'}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={async () => {
                const url = `${window.location.origin}/status/${project.gid}`;
                try {
                  await navigator.clipboard.writeText(url);
                  alert(`Status URL copied: ${url}`);
                } catch {
                  prompt('Copy this URL:', url);
                }
              }}
              className="text-[10px] tracking-widest uppercase font-bold text-black/55 hover:text-brand-blue smooth-transition"
              title="Copy the client-facing status page URL"
            >
              📤 Share status
            </button>
            {isDirty && status !== 'saving' && (
              <button
                onClick={save}
                className="px-3 py-1 text-[10px] tracking-widest uppercase font-bold text-white bg-brand-blue rounded-full hover:bg-blue-600 smooth-transition"
              >
                Save now
              </button>
            )}
          </div>
        </div>

        {/* Editor */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={save}
          disabled={status === 'loading'}
          placeholder={`Drop call notes, decisions, questions, anything…\n\n• Call recap\n• Decisions made\n• Followups\n\n(saves automatically when you click outside)`}
          className="flex-1 w-full p-5 sm:p-6 bg-[#FAFAF7] resize-none focus:outline-none text-sm sm:text-base leading-relaxed text-brand-black placeholder:text-black/30 font-mono"
        />

        {/* Footer hint */}
        <div className="px-5 sm:px-6 py-3 border-t border-black/5 bg-white text-[10px] tracking-widest uppercase text-black/35 text-center">
          Shared with the team · Visible to anyone with dashboard access
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Time tracker + ping-Joe modal

const TIME_TRACKER_URL = 'https://docs.google.com/spreadsheets/d/1ZKQfXSTa6lKwA-P9qQzeIu9X--RgIRMXkc_oQnbsvPk/edit?gid=1585261867#gid=1585261867';

const TimeTrackerModal: React.FC<{
  viewer: CapacityRow | null;
  timesheet: TimesheetResponse | null;
  viewerGid: string | null;
  onClose: () => void;
  onCounterChanged: () => void;
}> = ({ viewer, timesheet, viewerGid, onClose, onCounterChanged }) => {
  const [hours, setHours] = useState(6);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [resetStatus, setResetStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const pingJoe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hours || hours <= 0) return;
    setStatus('sending');
    setErrorMsg('');

    const today = new Date().toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const viewerName = viewer?.name || 'Mika';

    try {
      const resp = await fetch('https://formsubmit.co/ajax/joe@dfbdigital.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          from_dashboard: 'DFB Dashboard · Time Log',
          who: viewerName,
          hours: hours,
          date: today,
          note: note.trim() || '(no note)',
          time_tracker: TIME_TRACKER_URL,
          _subject: `${viewerName} logged ${hours} hours today — ${today}`,
        }),
      });
      if (!resp.ok) throw new Error('Email service returned an error');
      setStatus('success');
      setNote('');
      setTimeout(() => setStatus('idle'), 3500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send');
    }
  };

  const presets = [4, 6, 8];

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-[#FAFAF7] sm:rounded-3xl overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-7 border-b border-black/5 bg-white">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">Time + work log</div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight">Log hours · Ping Joe</h2>
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

        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* Quick log + ping */}
          <form onSubmit={pingJoe} className="bg-white border border-black/5 rounded-2xl p-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">
                Hours logged today
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value) || 0)}
                  className="w-20 px-3 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-lg sm:text-base text-center font-bold focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition"
                />
                <span className="text-sm text-black/55">hours</span>
                <div className="flex gap-1 ml-auto">
                  {presets.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHours(h)}
                      className={`px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-full smooth-transition ${
                        hours === h
                          ? 'bg-brand-blue text-white'
                          : 'text-black/55 border border-black/10 hover:border-brand-blue hover:text-brand-blue'
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">
                What you worked on
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder={`e.g. "Finished Reyes Medical homepage. Pushed PMASEV slide tweaks. Drafted Acme contract."`}
                className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-base sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue smooth-transition resize-none"
              />
              <p className="text-[11px] text-black/45 mt-2">
                Optional but recommended — Joe sees this in the email subject.
              </p>
            </div>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm">
                ✓ Joe pinged. Email sent.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending' || !hours}
              className="w-full px-6 py-3.5 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-brand-blue/20"
            >
              {status === 'sending'
                ? 'Sending…'
                : `📬 Ping Joe — I hit ${hours} hours today`}
            </button>
          </form>

          {/* Link to the full tracker */}
          <a
            href={TIME_TRACKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-4 bg-white border border-black/10 hover:border-brand-blue hover:bg-brand-blue/[0.03] rounded-2xl smooth-transition"
          >
            <div>
              <div className="font-bold text-sm">📊 Open my time tracker</div>
              <div className="text-[11px] text-black/45 mt-0.5">Google Sheet · opens in new tab</div>
            </div>
            <span className="text-[10px] tracking-widest uppercase text-black/40">Open</span>
          </a>

          {/* Invoice counter controls */}
          {timesheet?.ok && timesheet.connected && viewerGid && (
            <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="text-[11px] tracking-widest uppercase font-bold text-black/55">
                  Invoice counter
                </div>
                {timesheet.lastPingedAt && (
                  <div className="text-[10px] tracking-wide text-black/40">
                    Last reset: {formatPingedAt(timesheet.lastPingedAt)}
                  </div>
                )}
              </div>
              <div className="text-sm text-black/65 leading-snug">
                Currently tracking{' '}
                <strong className="text-brand-blue">
                  {(timesheet.cumulativeSincePing || 0).toFixed(1)}h
                </strong>{' '}
                of unbilled work toward the next 6h auto-ping.
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={async () => {
                    if (!viewerGid) return;
                    setResetStatus('sending');
                    try {
                      await fetch('/api/dashboard/timesheet', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ viewerGid, action: 'reset-to-zero' }),
                      });
                      setResetStatus('done');
                      onCounterChanged();
                      setTimeout(() => setResetStatus('idle'), 2000);
                    } catch {
                      setResetStatus('idle');
                    }
                  }}
                  className="px-3 py-2 text-[11px] font-bold tracking-widest uppercase text-brand-blue border border-brand-blue/30 rounded-full hover:bg-brand-blue/5 smooth-transition"
                >
                  {resetStatus === 'sending' ? 'Resetting…' : resetStatus === 'done' ? '✓ Done' : 'Count all hours as unbilled'}
                </button>
                <button
                  onClick={async () => {
                    if (!viewerGid) return;
                    if (!window.confirm('Mark everything in your sheet as paid? The counter resets to 0 and only new hours will count toward the next ping.')) return;
                    setResetStatus('sending');
                    try {
                      await fetch('/api/dashboard/timesheet', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({
                          viewerGid,
                          action: 'mark-paid',
                          lifetimeHours: timesheet.lifetimeHours,
                        }),
                      });
                      setResetStatus('done');
                      onCounterChanged();
                      setTimeout(() => setResetStatus('idle'), 2000);
                    } catch {
                      setResetStatus('idle');
                    }
                  }}
                  className="px-3 py-2 text-[11px] font-bold tracking-widest uppercase text-black/55 border border-black/15 rounded-full hover:bg-black/5 smooth-transition"
                >
                  Mark all paid
                </button>
              </div>
            </div>
          )}

          <p className="text-[11px] text-black/40 text-center">
            Email goes to joe@dfbdigital.com via the same formsubmit pipe used for PMASEV leads.
          </p>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────────────
// Dates manager — birthdays, anniversaries, contract starts

const DatesManager: React.FC<{
  dates: DateEntry[];
  onClose: () => void;
  onChanged: () => void;
}> = ({ dates, onClose, onChanged }) => {
  const [name, setName] = useState('');
  const [monthDay, setMonthDay] = useState('');
  const [type, setType] = useState<'birthday' | 'anniversary' | 'contract-start' | 'other'>('birthday');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !monthDay) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const resp = await fetch('/api/dashboard/dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: name.trim(), monthDay, type, notes: notes.trim() }),
      });
      const json = await resp.json();
      if (!json.ok) throw new Error(json.error || 'Failed to save');
      setName('');
      setMonthDay('');
      setNotes('');
      onChanged();
      setStatus('idle');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save');
      setStatus('error');
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Remove this date?')) return;
    await fetch(`/api/dashboard/dates?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    onChanged();
  };

  // Sort by next occurrence
  const sorted = [...dates]
    .map((e) => ({ ...e, _daysAway: daysUntilMonthDay(e.monthDay) }))
    .sort((a, b) => a._daysAway - b._daysAway);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-[#FAFAF7] sm:rounded-3xl overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-7 border-b border-black/5 bg-white">
          <div>
            <div className="text-xs tracking-widest uppercase font-bold text-brand-blue mb-1">Relationship calendar</div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight">Birthdays + anniversaries</h2>
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

        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* Add form */}
          <form onSubmit={submit} className="bg-white border border-black/5 rounded-2xl p-5 space-y-3">
            <div className="text-[11px] tracking-widest uppercase font-bold text-black/55">Add new</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (e.g. Dr. Reyes)"
                required
                className="px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'birthday' | 'anniversary' | 'contract-start' | 'other')}
                className="px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
              >
                <option value="birthday">🎂 Birthday</option>
                <option value="anniversary">💐 Anniversary</option>
                <option value="contract-start">🤝 Contract started</option>
                <option value="other">📅 Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] tracking-widest uppercase font-bold text-black/45 mb-1">Month</label>
                <select
                  value={monthDay.split('-')[0] || ''}
                  onChange={(e) => {
                    const m = e.target.value;
                    const d = monthDay.split('-')[1] || '';
                    setMonthDay(m && d ? `${m}-${d}` : m ? `${m}-01` : '');
                  }}
                  required
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
                >
                  <option value="">—</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={String(m).padStart(2, '0')}>
                      {new Date(2000, m - 1, 1).toLocaleDateString(undefined, { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase font-bold text-black/45 mb-1">Day</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={monthDay.split('-')[1] || ''}
                  onChange={(e) => {
                    const m = monthDay.split('-')[0] || '01';
                    const d = String(Math.max(1, Math.min(31, Number(e.target.value) || 0))).padStart(2, '0');
                    setMonthDay(`${m}-${d}`);
                  }}
                  required
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
                />
              </div>
            </div>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes (optional — e.g. 'sent flowers last year, do something different')"
              className="w-full px-4 py-3 bg-[#FAFAF7] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-brand-blue smooth-transition"
            />
            {status === 'error' && (
              <p className="text-sm text-red-600">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending' || !name.trim() || !monthDay}
              className="px-5 py-2.5 bg-brand-blue text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-blue-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Saving…' : '+ Add'}
            </button>
          </form>

          {/* List */}
          <div>
            <div className="text-[11px] tracking-widest uppercase font-bold text-black/55 mb-3">
              All dates ({sorted.length})
            </div>
            {sorted.length === 0 ? (
              <p className="text-sm text-black/45 italic">
                Nothing yet. Add a client's birthday or contract anniversary to start getting nudges in your morning briefing.
              </p>
            ) : (
              <ul className="space-y-2">
                {sorted.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center justify-between gap-3 bg-white border border-black/5 rounded-xl px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span>{emojiForType(e.type)}</span>
                        <span className="font-semibold text-sm">{e.name}</span>
                      </div>
                      <div className="text-[11px] text-black/45 mt-0.5">
                        {dateLabelForUpcoming(e.monthDay)}{e.notes ? ` · ${e.notes}` : ''}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(e.id)}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-black/35 hover:text-red-600 hover:bg-red-50 smooth-transition"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function timeAgo(ts: number): string {
  const secs = Math.floor((Date.now() - ts) / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

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
