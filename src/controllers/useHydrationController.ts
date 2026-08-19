import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useEffect } from 'react';

import { db } from '@/db/client';
import { hydrationLogs } from '@/db/schema';
import { useNotificationStore } from '@/store/useNotificationStore';

const DAILY_GOAL_ML = 2000;
const LOG_AMOUNT_ML = 250;

function isToday(date: Date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function useHydrationController() {
  const { data: logs } = useLiveQuery(db.select().from(hydrationLogs));
  const { permissionGranted, checkPermission, requestPermission } = useNotificationStore();

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const todayMl = (logs ?? [])
    .filter((log) => isToday(log.loggedAt))
    .reduce((sum, log) => sum + log.amountMl, 0);

  const progress = Math.min(1, todayMl / DAILY_GOAL_ML);

  const logWater = () => {
    db.insert(hydrationLogs).values({ amountMl: LOG_AMOUNT_ML, loggedAt: new Date() });
  };

  return {
    todayMl,
    dailyGoalMl: DAILY_GOAL_ML,
    logAmountMl: LOG_AMOUNT_ML,
    progress,
    logWater,
    permissionGranted,
    requestPermission,
  };
}
