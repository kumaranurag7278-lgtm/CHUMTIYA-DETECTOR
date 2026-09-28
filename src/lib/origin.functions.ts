import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const req = getRequest();

  // 1. Check proxy forwarding headers (Vercel, Cloudflare, standard reverse proxies)
  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const hostHeader = req.headers.get("host");

  const effectiveHost = forwardedHost ? forwardedHost.split(",")[0]?.trim() : hostHeader;

  if (effectiveHost && !effectiveHost.startsWith("localhost") && !effectiveHost.startsWith("127.0.0.1")) {
    const proto = forwardedProto || "https";
    return `${proto}://${effectiveHost}`;
  }

  // 2. Check Vercel system environment variables if available
  if (process.env["VERCEL_PROJECT_PRODUCTION_URL"]) {
    return `https://${process.env["VERCEL_PROJECT_PRODUCTION_URL"]}`;
  }
  if (process.env["VERCEL_URL"]) {
    return `https://${process.env["VERCEL_URL"]}`;
  }

  // 3. Fallback to request URL (local development: e.g. http://localhost:8080)
  try {
    const url = new URL(req.url);
    if (forwardedHost) {
      const proto = forwardedProto || "https";
      return `${proto}://${forwardedHost}`;
    }
    return url.origin;
  } catch {
    return effectiveHost ? `https://${effectiveHost}` : "";
  }
});
