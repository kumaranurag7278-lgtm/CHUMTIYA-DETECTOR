import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { checkAdminAuthAndGetStats } from "@/lib/admin.functions";
import type { AnalyticsDashboardStats, TrendDataPoint, QuestionSuggestion } from "@/lib/analytics-types";
import {
  Shield,
  ShieldAlert,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Activity,
  Users,
  Eye as EyeIcon,
  CheckCircle2,
  TrendingUp,
  Share2,
  Layers,
  RefreshCw,
  LogOut,
  ExternalLink,
  Check,
  Lightbulb,
  Copy,
  CheckCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  loader: async () => {
    return await checkAdminAuthAndGetStats();
  },
  head: () => ({
    meta: [
      { title: "Owner Analytics Portal | Chumtiya Detector" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminAnalyticsPage,
});

function AdminAnalyticsPage() {
  const loaderData = Route.useLoaderData();
  const [authenticated, setAuthenticated] = useState(loaderData.authenticated);
  const [stats, setStats] = useState<AnalyticsDashboardStats | null>(loaderData.stats);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");
  const [metricFilter, setMetricFilter] = useState<"all" | "traffic" | "surveys" | "shares">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySuggestion = (sug: QuestionSuggestion) => {
    const formatted = `Category: ${sug.category}\nQuestion: ${sug.question}${sug.options ? `\nOptions:\n${sug.options}` : ""}\nAuthor: ${sug.authorName}${sug.authorHandle ? ` (${sug.authorHandle})` : ""}`;
    navigator.clipboard.writeText(formatted);
    setCopiedId(sug.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setLoginError(data?.error || "Invalid owner password.");
        setLoggingIn(false);
        return;
      }

      // Fetch fresh stats after login
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      setAuthenticated(true);
      setPassword("");
    } catch {
      setLoginError("Connection failed. Please retry.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setAuthenticated(false);
    setStats(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const updated = await res.json();
        setStats(updated);
      }
    } catch {
      /* silent */
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  // If not authenticated, render strict Owner Login Shield
  if (!authenticated || !stats) {
    return (
      <main className="flex min-h-[100svh] flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
        <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card/60 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-destructive/40 bg-destructive/10 text-destructive shadow-inner">
            <Lock className="h-8 w-8" />
          </div>

          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-[10px] font-mono tracking-widest text-destructive uppercase">
              <ShieldAlert className="h-3 w-3" /> Private Owner Portal
            </span>
            <h1 className="mt-3 text-2xl font-black tracking-tight uppercase sm:text-3xl">
              Owner Analytics
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Protected system telemetry. Access is strictly authenticated server-side.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="owner-pass"
                className="block text-xs font-mono tracking-wider text-muted-foreground uppercase"
              >
                Owner Access Key
              </label>
              <div className="relative mt-2">
                <input
                  id="owner-pass"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret owner key..."
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 pr-10 text-sm font-mono text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive animate-fade-in">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn || !password.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-xs font-bold tracking-widest text-accent-foreground uppercase transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4" /> Unlock Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-border/50 pt-5 text-center">
            <a
              href="/"
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              ← Return to Chumtiya Detector
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Active trend series based on selection
  const trendData: TrendDataPoint[] =
    timeRange === "24h"
      ? stats.trends.hourly
      : timeRange === "7d"
      ? stats.trends.daily7Days
      : stats.trends.daily30Days;

  return (
    <main className="min-h-[100svh] bg-background px-4 py-8 text-foreground sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Header & Navigation */}
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-mono tracking-widest text-accent uppercase">
                <Shield className="h-3 w-3" /> Owner Authenticated
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Vercel Analytics Active
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight uppercase sm:text-4xl">
              Owner Analytics Command Center
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Real-time telemetry, visitor traffic, conversion funnels & engagement metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase transition-all duration-150 hover:border-accent hover:text-foreground active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-accent" : ""}`} />
              Refresh
            </button>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase transition-all duration-150 hover:border-accent hover:text-foreground active:scale-95"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Site
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs font-bold tracking-wider text-destructive uppercase transition-all duration-150 hover:bg-destructive hover:text-destructive-foreground active:scale-95"
            >
              <LogOut className="h-3.5 w-3.5" />
              Lock
            </button>
          </div>
        </header>

        {/* SECTION 1: TRAFFIC OVERVIEW (Visitors & Pageviews across timeframes) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase sm:text-sm">
              1. Traffic Telemetry (Vercel Integrated)
            </h2>
            <span className="text-[11px] font-mono text-muted-foreground">
              Last synced: {new Date(stats.lastUpdated).toLocaleTimeString()}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Visitors Card */}
            <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md transition-all duration-200 hover:border-accent/40">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-mono text-xs tracking-wider uppercase">Total Visitors</span>
                <Users className="h-4 w-4 text-accent" />
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight text-foreground tabular-nums sm:text-4xl">
                {stats.traffic.visitors.allTime.toLocaleString()}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-mono text-muted-foreground">
                <span>Today: <strong className="text-foreground">{stats.traffic.visitors.today}</strong></span>
                <span>7D: <strong className="text-foreground">{stats.traffic.visitors.last7Days}</strong></span>
                <span>30D: <strong className="text-foreground">{stats.traffic.visitors.last30Days}</strong></span>
              </div>
            </div>

            {/* Page Views Card */}
            <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md transition-all duration-200 hover:border-accent/40">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-mono text-xs tracking-wider uppercase">Page Views</span>
                <EyeIcon className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight text-foreground tabular-nums sm:text-4xl">
                {stats.traffic.pageViews.allTime.toLocaleString()}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-mono text-muted-foreground">
                <span>Today: <strong className="text-foreground">{stats.traffic.pageViews.today}</strong></span>
                <span>7D: <strong className="text-foreground">{stats.traffic.pageViews.last7Days}</strong></span>
                <span>30D: <strong className="text-foreground">{stats.traffic.pageViews.last30Days}</strong></span>
              </div>
            </div>

            {/* Active Rate Card */}
            <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md transition-all duration-200 hover:border-accent/40">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-mono text-xs tracking-wider uppercase">Survey Completion Rate</span>
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight text-amber-400 tabular-nums sm:text-4xl">
                {stats.engagement.completionRate}%
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-mono text-muted-foreground">
                <span>Completed: <strong className="text-foreground">{stats.engagement.surveysCompleted.allTime.toLocaleString()}</strong></span>
                <span>Started: <strong className="text-foreground">{stats.engagement.surveysStarted.allTime.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Viral Share Rate Card */}
            <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md transition-all duration-200 hover:border-accent/40">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-mono text-xs tracking-wider uppercase">Viral Share Ratio</span>
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight text-purple-400 tabular-nums sm:text-4xl">
                {stats.engagement.viralShareRate}%
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-mono text-muted-foreground">
                <span>Total Shares: <strong className="text-foreground">{(stats.engagement.shareClicks.allTime + stats.engagement.shareLinkCopies.allTime).toLocaleString()}</strong></span>
                <span>Results: <strong className="text-foreground">{stats.engagement.resultsViewed.allTime.toLocaleString()}</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CONVERSION FUNNEL */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase sm:text-sm">
                2. User Conversion Funnel
              </h2>
              <p className="text-xs text-muted-foreground">
                End-to-end progression: Visitor arrival → Diagnosis start → Completion → Share engagement.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-1.5 text-xs font-mono">
              <span className="text-muted-foreground">Overall Funnel Conversion:</span>
              <strong className="text-accent">{stats.funnel.overallConversionRate}%</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            {stats.funnel.stages.map((stage, idx) => {
              const colors = [
                "border-cyan-500/50 bg-cyan-500/10 text-cyan-400",
                "border-blue-500/50 bg-blue-500/10 text-blue-400",
                "border-amber-500/50 bg-amber-500/10 text-amber-400",
                "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
                "border-purple-500/50 bg-purple-500/10 text-purple-400",
              ];
              const badgeColor = colors[idx] || "border-accent/40 bg-accent/10 text-accent";

              return (
                <div
                  key={stage.name}
                  className="relative flex flex-col justify-between rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex rounded-lg border px-2 py-0.5 font-mono text-[10px] uppercase ${badgeColor}`}>
                        Step {idx + 1}
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground">
                        {stage.percentageOfTop}%
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-foreground">
                      {stage.name}
                    </h3>
                    <p className="mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums">
                      {stage.count.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-border/50 pt-3">
                    {/* Visual Progress Bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${stage.percentageOfTop}%` }}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      {idx === 0 ? (
                        <span>Top of Funnel</span>
                      ) : (
                        <span>
                          {stage.conversionFromPrevious}% from Step {idx}
                        </span>
                      )}
                      {idx > 0 && stage.dropoffPercentage > 0 && (
                        <span className="text-destructive/80">-{stage.dropoffPercentage}%</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: TRENDS OVER TIME (Recharts Area Visualization) */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase sm:text-sm">
                3. Activity Trends Over Time
              </h2>
              <p className="text-xs text-muted-foreground">
                Hourly and daily distribution across traffic and user engagement.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Metric filter */}
              <div className="flex rounded-xl border border-border bg-background/60 p-1 text-xs">
                {(["all", "traffic", "surveys", "shares"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetricFilter(m)}
                    className={`rounded-lg px-2.5 py-1 font-mono uppercase transition-colors ${
                      metricFilter === m
                        ? "bg-accent font-bold text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Timeframe switch */}
              <div className="flex rounded-xl border border-border bg-background/60 p-1 text-xs">
                {(["24h", "7d", "30d"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`rounded-lg px-2.5 py-1 font-mono uppercase transition-colors ${
                      timeRange === t
                        ? "bg-accent font-bold text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "24h" ? "Today" : t === "7d" ? "7 Days" : "30 Days"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[360px] w-full rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-md">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSurveysStarted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSurveysCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="#737373"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#262626" }}
                />
                <YAxis
                  stroke="#737373"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#262626" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d0d0d",
                    border: "1px solid #262626",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  }}
                />
                {(metricFilter === "all" || metricFilter === "traffic") && (
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                  />
                )}
                {(metricFilter === "all" || metricFilter === "surveys") && (
                  <Area
                    type="monotone"
                    dataKey="surveysStarted"
                    name="Surveys Started"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSurveysStarted)"
                  />
                )}
                {(metricFilter === "all" || metricFilter === "surveys") && (
                  <Area
                    type="monotone"
                    dataKey="surveysCompleted"
                    name="Surveys Completed"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSurveysCompleted)"
                  />
                )}
                {(metricFilter === "all" || metricFilter === "shares") && (
                  <Area
                    type="monotone"
                    dataKey="shares"
                    name="Shares & Copies"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorShares)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* SECTION 4: DETAILED ENGAGEMENT METRICS & BREAKDOWNS */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Share Channels Breakdown */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-accent" />
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase">
                Share Channel Distribution
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Where users distribute their verdicts and certificates.
            </p>

            <div className="mt-5 space-y-3.5">
              {stats.breakdowns.shareChannels.map((item) => (
                <div key={item.channel}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.channel}</span>
                    <span className="font-mono text-muted-foreground">
                      {item.count.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Survey Mode Split */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-400" />
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase">
                Quiz Mode Engagement
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Self Diagnostic vs Diagnose a Friend ratio.
            </p>

            <div className="mt-5 space-y-4">
              {stats.breakdowns.surveyModes.map((item) => (
                <div key={item.mode} className="rounded-xl border border-border/60 bg-background/50 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider">{item.mode}</h4>
                    <span className="font-mono text-xs text-accent font-bold">{item.percentage}%</span>
                  </div>
                  <p className="mt-2 text-xl font-black tabular-nums">{item.count.toLocaleString()} starts</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Recent Events Stream */}
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-amber-400" />
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase">
                Live Anonymous Telemetry
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Real-time sanitized user action stream.
            </p>

            <div className="mt-5 space-y-3">
              {stats.breakdowns.recentEvents.slice(0, 7).map((ev) => {
                const diffMin = Math.max(1, Math.round((Date.now() - ev.timestamp) / 60000));
                return (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-3.5 py-2.5 text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                        {ev.event.replace(/_/g, " ")}
                      </p>
                      <p className="truncate font-medium text-foreground">{ev.details}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                      {diffMin}m ago
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4.5: COMMUNITY QUESTIONS & SUGGESTIONS INBOX */}
        <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent animate-pulse" />
                <h3 className="font-mono text-sm font-bold tracking-widest uppercase">
                  Community Sawaal & Suggestions Inbox
                </h3>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-accent">
                  {(stats.suggestions || []).length} submissions
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Questions, roast ideas, and funny situations submitted live by site visitors.
              </p>
            </div>
          </div>

          {!stats.suggestions || stats.suggestions.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-border/70 p-8 text-center">
              <Lightbulb className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm font-semibold text-muted-foreground">
                Abhi tak koi sawaal submit nahi hua.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Website par floating "Sawaal Suggest Karo" button se users jaise hi submit karenge, live yahan dikhenge!
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {stats.suggestions.map((sug) => {
                const diffMin = Math.max(1, Math.round((Date.now() - sug.createdAt) / 60000));
                const timeLabel =
                  diffMin < 60
                    ? `${diffMin}m ago`
                    : diffMin < 1440
                    ? `${Math.round(diffMin / 60)}h ago`
                    : new Date(sug.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      });
                const isCopied = copiedId === sug.id;

                return (
                  <div
                    key={sug.id}
                    className="flex flex-col justify-between rounded-xl border border-border/80 bg-background/50 p-4 transition hover:border-accent/50"
                  >
                    <div>
                      {/* Category & Time */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono font-medium text-accent">
                          {sug.category}
                        </span>
                        <span className="font-mono text-muted-foreground">{timeLabel}</span>
                      </div>

                      {/* Question */}
                      <h4 className="mt-3 text-sm font-bold leading-snug text-foreground">
                        "{sug.question}"
                      </h4>

                      {/* Options if provided */}
                      {sug.options && (
                        <div className="mt-2.5 rounded-lg border border-border/50 bg-card/40 p-2.5 text-xs text-muted-foreground">
                          <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground/80 mb-1">
                            Suggested Options:
                          </p>
                          <p className="whitespace-pre-line text-foreground/90 font-sans">
                            {sug.options}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Author credit & 1-Click Copy */}
                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                      <div className="text-xs">
                        <span className="text-muted-foreground text-[11px]">By: </span>
                        <strong className="text-foreground font-semibold">{sug.authorName}</strong>
                        {sug.authorHandle && (
                          <span className="ml-1 font-mono text-[11px] text-accent">
                            {sug.authorHandle.startsWith("@") ? sug.authorHandle : `@${sug.authorHandle}`}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleCopySuggestion(sug)}
                        title="Copy question and options"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground transition hover:border-accent hover:bg-accent/10 hover:text-accent active:scale-95"
                      >
                        {isCopied ? (
                          <>
                            <CheckCheck className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-muted-foreground" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 5: PRIVACY & SYSTEM CONFIGURATION */}
        <footer className="rounded-2xl border border-border/50 bg-card/30 p-6 text-xs text-muted-foreground backdrop-blur-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>
                <strong>Privacy Policy Compliance:</strong> No PII (names, emails, IPs, or location) is recorded or stored.
              </span>
            </div>
            <span className="font-mono text-[11px]">
              Engine: TanStack Start + Nitro SSR + Vercel Web Analytics
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
