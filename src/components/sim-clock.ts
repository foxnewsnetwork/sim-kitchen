import React, { useState, useEffect } from 'react';

/**
 * The clock ticks in milliseconds
 */
export function SimClock(msPerTick: number = 100): number {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(() => time + msPerTick)
    }, msPerTick)

    return () => window.clearInterval(interval)
  })

  return time;
}