import crypto from "node:crypto";

const DEFAULT_SECRET = "chumtiya-owner-2026";
const SESSION_COOKIE_NAME = "chumtiya_owner_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export function getOwnerSecret(): string {
  return (
    process.env["ADMIN_PASSWORD"] ||
    process.env["OWNER_SECRET_KEY"] ||
    process.env["ANALYTICS_SECRET_KEY"] ||
    DEFAULT_SECRET
  );
}

export function verifyOwnerPassword(providedPassword: string): boolean {
  if (!providedPassword || typeof providedPassword !== "string") return false;
  const secret = getOwnerSecret();

  const providedHash = crypto.createHash("sha256").update(providedPassword.trim()).digest();
  const secretHash = crypto.createHash("sha256").update(secret.trim()).digest();

  try {
    return crypto.timingSafeEqual(providedHash, secretHash);
  } catch {
    return false;
  }
}

export function createOwnerSessionToken(): string {
  const secret = getOwnerSecret();
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`owner_authenticated:${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifyOwnerSessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const timestampStr = parts[0];
  const signature = parts[1];
  if (!timestampStr || !signature) return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration: valid for 7 days
  const now = Date.now();
  if (now - timestamp > SESSION_MAX_AGE_SECONDS * 1000 || timestamp > now + 60000) {
    return false;
  }

  const secret = getOwnerSecret();
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(`owner_authenticated:${timestampStr}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSig, "hex")
    );
  } catch {
    return false;
  }
}

export function parseCookies(cookieHeader: string | null | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    if (idx < 0) continue;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    try {
      cookies[key] = decodeURIComponent(val);
    } catch {
      cookies[key] = val;
    }
  }
  return cookies;
}

export function isOwnerAuthenticated(requestOrCookieHeader: Request | Headers | string | null | undefined): boolean {
  let cookieHeader: string | null = null;

  if (typeof requestOrCookieHeader === "string") {
    cookieHeader = requestOrCookieHeader;
  } else if (requestOrCookieHeader && "headers" in requestOrCookieHeader) {
    cookieHeader = requestOrCookieHeader.headers.get("cookie");
  } else if (requestOrCookieHeader && "get" in requestOrCookieHeader) {
    cookieHeader = (requestOrCookieHeader as Headers).get("cookie");
  }

  const cookies = parseCookies(cookieHeader);
  const token = cookies[SESSION_COOKIE_NAME];
  return verifyOwnerSessionToken(token);
}

export function getOwnerSessionCookie(token: string): string {
  const isProd = process.env["NODE_ENV"] === "production" || !!process.env["VERCEL"];
  const secureFlag = isProd ? "Secure;" : "";
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_MAX_AGE_SECONDS}; ${secureFlag}`;
}

export function getOwnerClearCookie(): string {
  const isProd = process.env["NODE_ENV"] === "production" || !!process.env["VERCEL"];
  const secureFlag = isProd ? "Secure;" : "";
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${secureFlag}`;
}
