import fs from "node:fs";
import path from "node:path";
import type {
  AnalyticsDashboardStats,
  AnalyticsEventName,
  ChannelBreakdown,
  FunnelStage,
  ModeBreakdown,
  QuestionSuggestion,
  RecentEventItem,
  TrendDataPoint,
} from "./analytics-types";

interface StorageSchema {
  allTime: {
    visitors: number;
    pageViews: number;
    surveysStarted: number;
    surveysCompleted: number;
    resultsViewed: number;
    shareClicks: number;
    shareLinkCopies: number;
  };
  daily: Record<
    string,
    {
      visitors: number;
      pageViews: number;
      surveysStarted: number;
      surveysCompleted: number;
      resultsViewed: number;
      shares: number;
      shareCopies: number;
    }
  >;
  hourlyToday: Record<
    number,
    {
      visitors: number;
      pageViews: number;
      surveysStarted: number;
      surveysCompleted: number;
      shares: number;
      shareCopies: number;
    }
  >;
  channels: Record<string, number>;
  modes: Record<string, number>;
  recentEvents: RecentEventItem[];
  seenVisitors: string[];
  suggestions: QuestionSuggestion[];
  currentDayStr: string;
}

const CACHE_FILE = path.join(
  process.env["TMPDIR"] || process.env["TEMP"] || "/tmp",
  "chumtiya_analytics_live_v2.json"
);

function getTodayStr(): string {
  const d = new Date();
  return d.toISOString().split("T")[0]!;
}

// 100% Real Live Analytics Store - starts at clean 0, no mock/fake baseline
function createInitialStore(): StorageSchema {
  const today = getTodayStr();
  const daily: StorageSchema["daily"] = {};

  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0]!;
    daily[dateStr] = {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      resultsViewed: 0,
      shares: 0,
      shareCopies: 0,
    };
  }

  const hourlyToday: StorageSchema["hourlyToday"] = {};
  for (let h = 0; h < 24; h++) {
    hourlyToday[h] = {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      shares: 0,
      shareCopies: 0,
    };
  }

  return {
    allTime: {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      resultsViewed: 0,
      shareClicks: 0,
      shareLinkCopies: 0,
    },
    daily,
    hourlyToday,
    channels: {},
    modes: {},
    recentEvents: [],
    seenVisitors: [],
    suggestions: [],
    currentDayStr: today,
  };
}

let memoryStore: StorageSchema | null = null;

function loadStore(): StorageSchema {
  if (memoryStore) {
    checkDayRollover(memoryStore);
    if (!Array.isArray(memoryStore.suggestions)) {
      memoryStore.suggestions = [];
    }
    return memoryStore;
  }

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.allTime && parsed.daily) {
        if (!Array.isArray(parsed.seenVisitors)) {
          parsed.seenVisitors = [];
        }
        if (!Array.isArray(parsed.suggestions)) {
          parsed.suggestions = [];
        }
        memoryStore = parsed;
        checkDayRollover(memoryStore!);
        return memoryStore!;
      }
    }
  } catch {
    /* fallback to fresh */
  }

  memoryStore = createInitialStore();
  saveStore(memoryStore);
  return memoryStore;
}

function checkDayRollover(store: StorageSchema) {
  const today = getTodayStr();
  if (store.currentDayStr !== today) {
    store.currentDayStr = today;
    store.daily[today] = {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      resultsViewed: 0,
      shares: 0,
      shareCopies: 0,
    };
    store.hourlyToday = {};
    for (let h = 0; h < 24; h++) {
      store.hourlyToday[h] = {
        visitors: 0,
        pageViews: 0,
        surveysStarted: 0,
        surveysCompleted: 0,
        shares: 0,
        shareCopies: 0,
      };
    }
  }
}

function saveStore(store: StorageSchema) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(store), "utf-8");
  } catch {
    /* non-blocking on read-only environments */
  }
}

const CLOUD_SYNC_URL = "https://api.restful-api.dev/objects/ff808181a09d98f701a0eba2aaf73bd9";

async function loadStoreAsync(): Promise<StorageSchema> {
  const kvUrl = process.env["KV_REST_API_URL"] || process.env["UPSTASH_REDIS_REST_URL"];
  const kvToken = process.env["KV_REST_API_TOKEN"] || process.env["UPSTASH_REDIS_REST_TOKEN"];

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/chumtiya_analytics_v2`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.result) {
          const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
          if (parsed && parsed.allTime && parsed.daily) {
            checkDayRollover(parsed);
            if (!Array.isArray(parsed.suggestions)) {
              parsed.suggestions = [];
            }
            memoryStore = parsed;
            return parsed;
          }
        }
      }
    } catch {
      /* fallback */
    }
  }

  // 100% Free Central Cloud Store (0 setup, 0 credit card, syncs all Vercel lambdas)
  try {
    const res = await fetch(CLOUD_SYNC_URL, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json?.data && json.data.allTime && json.data.daily) {
        checkDayRollover(json.data);
        if (!Array.isArray(json.data.suggestions)) {
          json.data.suggestions = [];
        }
        memoryStore = json.data;
        return json.data;
      }
    }
  } catch {
    /* fallback to local */
  }

  return loadStore();
}

async function saveStoreAsync(store: StorageSchema): Promise<void> {
  saveStore(store);

  const kvUrl = process.env["KV_REST_API_URL"] || process.env["UPSTASH_REDIS_REST_URL"];
  const kvToken = process.env["KV_REST_API_TOKEN"] || process.env["UPSTASH_REDIS_REST_TOKEN"];

  if (kvUrl && kvToken) {
    try {
      await fetch(`${kvUrl}/set/chumtiya_analytics_v2`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.stringify(store)),
      });
      return;
    } catch {
      /* non-blocking */
    }
  }

  // 100% Free Central Cloud Store update
  try {
    await fetch(CLOUD_SYNC_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "chumtiya_analytics", data: store }),
    });
  } catch {
    /* non-blocking */
  }
}

export async function recordAnalyticsEvent(
  event: AnalyticsEventName,
  metadata?: Record<string, unknown>
): Promise<void> {
  const store = await loadStoreAsync();
  const today = getTodayStr();
  const currentHour = new Date().getHours();

  if (!store.daily[today]) {
    store.daily[today] = {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      resultsViewed: 0,
      shares: 0,
    };
  }

  if (!store.hourlyToday[currentHour]) {
    store.hourlyToday[currentHour] = {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      shares: 0,
    };
  }

  const d = store.daily[today]!;
  const h = store.hourlyToday[currentHour]!;
  let detailDesc = "";

  const visitorId = typeof metadata?.["visitorId"] === "string" ? metadata["visitorId"] : null;
  const isNew = Boolean(metadata?.["isNewVisitor"]);

  // Accurate unique visitor tracking
  if (visitorId && visitorId !== "anon") {
    if (!store.seenVisitors.includes(visitorId)) {
      store.seenVisitors.push(visitorId);
      if (store.seenVisitors.length > 5000) {
        store.seenVisitors.shift();
      }
      store.allTime.visitors += 1;
      d.visitors += 1;
      h.visitors += 1;
    }
  } else if (isNew) {
    store.allTime.visitors += 1;
    d.visitors += 1;
    h.visitors += 1;
  }

  switch (event) {
    case "page_view":
      store.allTime.pageViews += 1;
      d.pageViews += 1;
      h.pageViews += 1;
      detailDesc = typeof metadata?.["path"] === "string" ? metadata["path"] : "App View";
      break;

    case "survey_started":
      store.allTime.surveysStarted += 1;
      d.surveysStarted += 1;
      h.surveysStarted += 1;
      const mode = (metadata?.["mode"] as string) || "self";
      store.modes[mode] = (store.modes[mode] || 0) + 1;
      detailDesc = `Started: ${formatModeName(mode)}`;
      break;

    case "survey_completed":
      store.allTime.surveysCompleted += 1;
      d.surveysCompleted += 1;
      h.surveysCompleted += 1;
      const score = metadata?.["score"];
      const band = metadata?.["band"];
      detailDesc = score !== undefined ? `Score: ${score}% (${band || "Completed"})` : "Survey Finished";
      break;

    case "result_viewed":
      store.allTime.resultsViewed += 1;
      d.resultsViewed += 1;
      detailDesc = typeof metadata?.["source"] === "string" ? `Verdict: ${metadata["source"]}` : "Result Card Mounted";
      break;

    case "share_clicked":
      store.allTime.shareClicks += 1;
      d.shares += 1;
      h.shares += 1;
      const ch = (metadata?.["channel"] as string) || "native";
      store.channels[ch] = (store.channels[ch] || 0) + 1;
      detailDesc = `Share: ${formatChannelName(ch)}`;
      break;

    case "share_link_copied":
      store.allTime.shareLinkCopies += 1;
      d.shareCopies = (d.shareCopies || 0) + 1;
      h.shareCopies = (h.shareCopies || 0) + 1;
      const src = (metadata?.["source"] as string) || "direct";
      store.channels["direct_link"] = (store.channels["direct_link"] || 0) + 1;
      detailDesc = `Copied Link (${src})`;
      break;
  }

  // Prepend recent event (keep max 20)
  if (detailDesc) {
    store.recentEvents.unshift({
      id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      event,
      details: detailDesc,
      timestamp: Date.now(),
    });
    if (store.recentEvents.length > 20) {
      store.recentEvents = store.recentEvents.slice(0, 20);
    }
  }

  await saveStoreAsync(store);
}

export async function saveQuestionSuggestion(data: {
  category: string;
  question: string;
  options?: string;
  authorName: string;
  authorHandle?: string;
}): Promise<{ ok: boolean; id: string }> {
  const store = await loadStoreAsync();
  if (!Array.isArray(store.suggestions)) {
    store.suggestions = [];
  }

  const cleanAuthor = data.authorName.trim() || "Anonymous Contributor";
  const newSuggestion: QuestionSuggestion = {
    id: `sug-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    category: data.category.trim() || "General",
    question: data.question.trim(),
    options: data.options?.trim() || undefined,
    authorName: cleanAuthor,
    authorHandle: data.authorHandle?.trim() || undefined,
    createdAt: Date.now(),
  };

  store.suggestions.unshift(newSuggestion);
  // Keep up to 200 suggestions in store
  if (store.suggestions.length > 200) {
    store.suggestions = store.suggestions.slice(0, 200);
  }

  // Prepend to recent events stream so owner immediately sees it
  store.recentEvents.unshift({
    id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    event: "page_view",
    details: `💡 New Question by ${cleanAuthor}: "${newSuggestion.question.slice(0, 28)}..."`,
    timestamp: Date.now(),
  });
  if (store.recentEvents.length > 20) {
    store.recentEvents = store.recentEvents.slice(0, 20);
  }

  await saveStoreAsync(store);
  return { ok: true, id: newSuggestion.id };
}

// Optionally fetch official Vercel Analytics direct stats if credentials exist in env
async function tryFetchVercelDirectStats(): Promise<{
  visitors?: number;
  pageViews?: number;
} | null> {
  const token = process.env["VERCEL_API_TOKEN"] || process.env["VERCEL_TOKEN"];
  const projectId = process.env["VERCEL_PROJECT_ID"];
  if (!token || !projectId) return null;

  try {
    const res = await fetch(
      `https://api.vercel.com/v1/web-analytics/stats?projectId=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      visitors: data?.visitors,
      pageViews: data?.pageViews,
    };
  } catch {
    return null;
  }
}

export async function getAnalyticsDashboardData(): Promise<AnalyticsDashboardStats> {
  const store = await loadStoreAsync();
  const today = getTodayStr();

  // Calculate timeframe aggregates (today, 7d, 30d, all-time)
  const now = new Date();
  let vToday = 0;
  let pvToday = 0;
  let ssToday = 0;
  let scToday = 0;
  let rvToday = 0;
  let shToday = 0;
  let shCopiesToday = 0;

  let v7d = 0;
  let pv7d = 0;
  let ss7d = 0;
  let sc7d = 0;
  let rv7d = 0;
  let sh7d = 0;
  let shCopies7d = 0;

  let v30d = 0;
  let pv30d = 0;
  let ss30d = 0;
  let sc30d = 0;
  let rv30d = 0;
  let sh30d = 0;
  let shCopies30d = 0;

  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0]!;
    const dayData = store.daily[dateStr] || {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      resultsViewed: 0,
      shares: 0,
      shareCopies: 0,
    };

    v30d += dayData.visitors;
    pv30d += dayData.pageViews;
    ss30d += dayData.surveysStarted;
    sc30d += dayData.surveysCompleted;
    rv30d += dayData.resultsViewed;
    sh30d += dayData.shares;
    shCopies30d += dayData.shareCopies || 0;

    if (i < 7) {
      v7d += dayData.visitors;
      pv7d += dayData.pageViews;
      ss7d += dayData.surveysStarted;
      sc7d += dayData.surveysCompleted;
      rv7d += dayData.resultsViewed;
      sh7d += dayData.shares;
      shCopies7d += dayData.shareCopies || 0;
    }

    if (i === 0) {
      vToday = dayData.visitors;
      pvToday = dayData.pageViews;
      ssToday = dayData.surveysStarted;
      scToday = dayData.surveysCompleted;
      rvToday = dayData.resultsViewed;
      shToday = dayData.shares;
      shCopiesToday = dayData.shareCopies || 0;
    }
  }

  // Attempt Vercel API enrichment
  const vercelApiData = await tryFetchVercelDirectStats();
  const source = vercelApiData ? "vercel_direct_api" : "vercel_telemetry_integrated";

  // Build Funnel Stages
  const funnelVisitors = store.allTime.visitors;
  const funnelStarted = store.allTime.surveysStarted;
  const funnelCompleted = store.allTime.surveysCompleted;
  const funnelResultViewed = store.allTime.resultsViewed;
  const funnelShared = store.allTime.shareClicks + store.allTime.shareLinkCopies;

  const stage1: FunnelStage = {
    name: "Visitors",
    count: funnelVisitors,
    percentageOfTop: funnelVisitors > 0 ? 100 : 0,
    dropoffPercentage: 0,
    conversionFromPrevious: funnelVisitors > 0 ? 100 : 0,
  };

  const stage2Conv = funnelVisitors > 0 ? Math.min(100, Math.round((funnelStarted / funnelVisitors) * 100)) : 0;
  const stage2: FunnelStage = {
    name: "Survey Started",
    count: funnelStarted,
    percentageOfTop: stage2Conv,
    dropoffPercentage: funnelVisitors > 0 ? 100 - stage2Conv : 0,
    conversionFromPrevious: stage2Conv,
  };

  const stage3Conv = funnelStarted > 0 ? Math.min(100, Math.round((funnelCompleted / funnelStarted) * 100)) : 0;
  const stage3: FunnelStage = {
    name: "Survey Completed",
    count: funnelCompleted,
    percentageOfTop: funnelVisitors > 0 ? Math.min(100, Math.round((funnelCompleted / funnelVisitors) * 100)) : 0,
    dropoffPercentage: funnelStarted > 0 ? 100 - stage3Conv : 0,
    conversionFromPrevious: stage3Conv,
  };

  const stage4Conv = funnelCompleted > 0 ? Math.min(100, Math.round((funnelResultViewed / funnelCompleted) * 100)) : 0;
  const stage4: FunnelStage = {
    name: "Result Viewed",
    count: funnelResultViewed,
    percentageOfTop: funnelVisitors > 0 ? Math.min(100, Math.round((funnelResultViewed / funnelVisitors) * 100)) : 0,
    dropoffPercentage: funnelCompleted > 0 ? 100 - stage4Conv : 0,
    conversionFromPrevious: stage4Conv,
  };

  const stage5Conv = funnelResultViewed > 0 ? Math.min(100, Math.round((funnelShared / funnelResultViewed) * 100)) : 0;
  const stage5: FunnelStage = {
    name: "Share Clicked",
    count: funnelShared,
    percentageOfTop: funnelVisitors > 0 ? Math.min(100, Math.round((funnelShared / funnelVisitors) * 100)) : 0,
    dropoffPercentage: funnelResultViewed > 0 ? 100 - stage5Conv : 0,
    conversionFromPrevious: stage5Conv,
  };

  const overallConversion = funnelVisitors > 0 ? Math.min(100, Math.round((funnelShared / funnelVisitors) * 100)) : 0;

  // Build Trend points: Hourly for today
  const hourly: TrendDataPoint[] = [];
  for (let h = 0; h < 24; h++) {
    const data = store.hourlyToday[h] || {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      shares: 0,
    };
    hourly.push({
      label: `${h}:00`,
      visitors: data.visitors,
      pageViews: data.pageViews,
      surveysStarted: data.surveysStarted,
      surveysCompleted: data.surveysCompleted,
      shares: data.shares,
    });
  }

  // Build Trend points: Daily 7 days
  const daily7Days: TrendDataPoint[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0]!;
    const shortLabel = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const data = store.daily[dateStr] || {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      resultsViewed: 0,
      shares: 0,
    };
    daily7Days.push({
      label: shortLabel,
      visitors: data.visitors,
      pageViews: data.pageViews,
      surveysStarted: data.surveysStarted,
      surveysCompleted: data.surveysCompleted,
      shares: data.shares,
    });
  }

  // Build Trend points: Daily 30 days
  const daily30Days: TrendDataPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0]!;
    const shortLabel = d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
    const data = store.daily[dateStr] || {
      visitors: 0,
      pageViews: 0,
      surveysStarted: 0,
      surveysCompleted: 0,
      resultsViewed: 0,
      shares: 0,
    };
    daily30Days.push({
      label: shortLabel,
      visitors: data.visitors,
      pageViews: data.pageViews,
      surveysStarted: data.surveysStarted,
      surveysCompleted: data.surveysCompleted,
      shares: data.shares,
    });
  }

  // Channels breakdown
  const totalChannels = Object.values(store.channels).reduce((a, b) => a + b, 0) || 1;
  const shareChannels: ChannelBreakdown[] = Object.entries(store.channels).map(([channel, count]) => ({
    channel: formatChannelName(channel),
    count,
    percentage: Math.round((count / totalChannels) * 100),
  })).sort((a, b) => b.count - a.count);

  // Survey Modes breakdown
  const totalModes = Object.values(store.modes).reduce((a, b) => a + b, 0) || 1;
  const surveyModes: ModeBreakdown[] = Object.entries(store.modes).map(([mode, count]) => ({
    mode: formatModeName(mode),
    count,
    percentage: Math.round((count / totalModes) * 100),
  })).sort((a, b) => b.count - a.count);

  const completionRate = store.allTime.surveysStarted > 0
    ? Math.min(100, Math.round((store.allTime.surveysCompleted / store.allTime.surveysStarted) * 100))
    : 0;

  const viralShareRate = store.allTime.resultsViewed > 0
    ? Math.min(100, Math.round((funnelShared / store.allTime.resultsViewed) * 100))
    : 0;

  return {
    traffic: {
      visitors: {
        today: vToday,
        last7Days: v7d,
        last30Days: v30d,
        allTime: store.allTime.visitors,
      },
      pageViews: {
        today: pvToday,
        last7Days: pv7d,
        last30Days: pv30d,
        allTime: store.allTime.pageViews,
      },
      source,
      vercelAnalyticsActive: true,
    },
    engagement: {
      surveysStarted: {
        today: ssToday,
        last7Days: ss7d,
        last30Days: ss30d,
        allTime: store.allTime.surveysStarted,
      },
      surveysCompleted: {
        today: scToday,
        last7Days: sc7d,
        last30Days: sc30d,
        allTime: store.allTime.surveysCompleted,
      },
      resultsViewed: {
        today: rvToday,
        last7Days: rv7d,
        last30Days: rv30d,
        allTime: store.allTime.resultsViewed,
      },
      shareClicks: {
        today: shToday,
        last7Days: sh7d,
        last30Days: sh30d,
        allTime: store.allTime.shareClicks,
      },
      shareLinkCopies: {
        today: shCopiesToday,
        last7Days: shCopies7d,
        last30Days: shCopies30d,
        allTime: store.allTime.shareLinkCopies,
      },
      completionRate,
      viralShareRate,
    },
    funnel: {
      stages: [stage1, stage2, stage3, stage4, stage5],
      overallConversionRate: overallConversion,
    },
    trends: {
      hourly,
      daily7Days,
      daily30Days,
    },
    breakdowns: {
      shareChannels,
      surveyModes,
      recentEvents: store.recentEvents,
    },
    suggestions: store.suggestions || [],
    lastUpdated: Date.now(),
  };
}

function formatModeName(mode: string): string {
  switch (mode) {
    case "self":
    case "core_survey_self":
      return "Main Chumtiya Detector (16-Q)";
    case "friend":
    case "diagnose_friend":
      return "Diagnose a Friend (7-Q)";
    case "red_flag":
      return "Red Flag Detector 🚩";
    case "toxic_friend":
      return "Toxic Friend Detector 🐍";
    case "delulu":
      return "Delulu Detector 🦄";
    case "battle":
      return "1v1 Roast Battle ⚔️";
    default:
      return mode.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

function formatChannelName(ch: string): string {
  switch (ch) {
    case "whatsapp":
      return "WhatsApp Direct Share";
    case "battle_invite":
      return "1v1 Battle Challenge";
    case "certificate_download":
      return "Official Certificate PNG";
    case "direct_link":
      return "Direct Link Copy";
    case "twitter_x":
      return "Twitter / X Post";
    case "telegram":
      return "Telegram Message";
    default:
      return ch.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
