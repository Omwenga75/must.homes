// Auth utility types and helpers

export type UserRole = "student" | "admin";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
  createdAt: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  iat: number;
  exp: number;
}

/**
 * Parse a JWT token without verifying its signature (client-side only).
 */
export function parseJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Check if a JWT token is expired.
 */
export function isTokenExpired(token: string): boolean {
  const payload = parseJWT(token);
  if (!payload) return true;
  return payload.exp * 1000 < Date.now();
}

/**
 * Get the cookie value by name (browser-only).
 */
export function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Format currency (KES)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Get time remaining until expiry
 */
export function getTimeRemaining(expiresAt: string | Date): {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  total: number;
} {
  const total = new Date(expiresAt).getTime() - Date.now();
  if (total <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true, total: 0 };
  }
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, isExpired: false, total };
}
