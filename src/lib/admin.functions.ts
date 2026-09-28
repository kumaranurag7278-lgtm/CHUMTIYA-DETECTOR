import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isOwnerAuthenticated } from "./auth.server";
import { getAnalyticsDashboardData } from "./analytics-store.server";
import type { AnalyticsDashboardStats } from "./analytics-types";

export const checkAdminAuthAndGetStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<{
    authenticated: boolean;
    stats: AnalyticsDashboardStats | null;
  }> => {
    const req = getRequest();
    const authenticated = isOwnerAuthenticated(req);

    if (!authenticated) {
      return {
        authenticated: false,
        stats: null,
      };
    }

    const stats = await getAnalyticsDashboardData();
    return {
      authenticated: true,
      stats,
    };
  }
);
