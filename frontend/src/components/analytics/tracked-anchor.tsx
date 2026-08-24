"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import type { AnalyticsEventName } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/tracker";

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Analytics event fired on click. Omit for an untracked link. */
  event?: AnalyticsEventName;
  /** Metadata forwarded to `track()` alongside the event. */
  metadata?: Record<string, string>;
}

/**
 * Anchor that fires an analytics event on click without preventing or
 * delaying navigation. Lets server components instrument external links
 * (a plain onClick handler is impossible there).
 */
export function TrackedAnchor({ event, metadata, onClick, ...props }: TrackedAnchorProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (event) track(event, metadata !== undefined ? { metadata } : undefined);
    onClick?.(e);
  }

  return <a {...props} onClick={handleClick} />;
}
