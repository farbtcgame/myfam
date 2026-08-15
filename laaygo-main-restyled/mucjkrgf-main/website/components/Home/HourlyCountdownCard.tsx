import React, { useEffect, useState } from "react";
import { pad2 } from "../../lib/countdown";

/** Milliseconds until the next full clock hour. */
function msUntilNextHour(): number {
  const now = new Date();
  const next = new Date(now);
  next.setMinutes(0, 0, 0);
  next.setHours(now.getHours() + 1);
  return next.getTime() - now.getTime();
}

/**
 * A perpetual 1-hour countdown: it always shows the time remaining until
 * the top of the next hour, then seamlessly rolls over and starts counting
 * down the following hour — no manual reset needed.
 */
export const HourlyCountdownCard: React.FC = () => {
  const [remaining, setRemaining] = useState(msUntilNextHour());

  useEffect(() => {
    const tick = () => setRemaining(msUntilNextHour());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return (
    <div className="glass pixel-corners p-5 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
        <span className="label-mono">Hourly Round</span>
      </div>
      <div className="mt-4 flex items-end gap-1.5">
        <div className="flex-1">
          <div className="font-display text-3xl sm:text-4xl font-bold text-neon tabular-nums">
            {pad2(minutes)}
          </div>
          <div className="label-mono mt-1">Min</div>
        </div>
        <div className="font-display text-2xl text-zinc-600 pb-4">:</div>
        <div className="flex-1">
          <div className="font-display text-3xl sm:text-4xl font-bold text-neon tabular-nums">
            {pad2(seconds)}
          </div>
          <div className="label-mono mt-1">Sec</div>
        </div>
      </div>
      <p className="text-[10px] text-zinc-500 mt-4">Resets automatically every hour, on the hour.</p>
    </div>
  );
};
