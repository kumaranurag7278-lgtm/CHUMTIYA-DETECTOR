export type AnalyticsEventName =
  | "survey_started"
  | "survey_completed"
  | "result_viewed"
  | "share_clicked"
  | "share_link_copied"
  | "page_view";

export interface AnalyticsEventPayload {
  event: AnalyticsEventName;
  metadata?: Record<string, unknown>;
  timestamp?: number;
}

export interface MetricTimeframe {
  today: number;
  last7Days: number;
  last30Days: number;
  allTime: number;
}

export interface FunnelStage {
  name: string;
  count: number;
  percentageOfTop: number;
  dropoffPercentage: number;
  conversionFromPrevious: number;
}

export interface TrendDataPoint {
  label: string;
  visitors: number;
  pageViews: number;
  surveysStarted: number;
  surveysCompleted: number;
  shares: number;
}

export interface ChannelBreakdown {
  channel: string;
  count: number;
  percentage: number;
}

export interface ModeBreakdown {
  mode: string;
  count: number;
  percentage: number;
}

export interface RecentEventItem {
  id: string;
  event: AnalyticsEventName;
  details: string;
  timestamp: number;
}

export interface QuestionSuggestion {
  id: string;
  category: string;
  question: string;
  options?: string;
  authorName: string;
  authorHandle?: string;
  createdAt: number;
}

export interface AnalyticsDashboardStats {
  traffic: {
    visitors: MetricTimeframe;
    pageViews: MetricTimeframe;
    source: "vercel_direct_api" | "vercel_telemetry_integrated";
    vercelAnalyticsActive: boolean;
  };
  engagement: {
    surveysStarted: MetricTimeframe;
    surveysCompleted: MetricTimeframe;
    resultsViewed: MetricTimeframe;
    shareClicks: MetricTimeframe;
    shareLinkCopies: MetricTimeframe;
    completionRate: number;
    viralShareRate: number;
  };
  funnel: {
    stages: FunnelStage[];
    overallConversionRate: number;
  };
  trends: {
    hourly: TrendDataPoint[];
    daily7Days: TrendDataPoint[];
    daily30Days: TrendDataPoint[];
  };
  breakdowns: {
    shareChannels: ChannelBreakdown[];
    surveyModes: ModeBreakdown[];
    recentEvents: RecentEventItem[];
  };
  suggestions: QuestionSuggestion[];
  lastUpdated: number;
}
