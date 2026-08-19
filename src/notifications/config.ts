import * as Notifications from 'expo-notifications';

try {
  // Throws in runtimes without the native module wired up (e.g. Expo Go on
  // Android, SDK 53+) — degrade silently instead of crashing the whole app.
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
} catch (error) {
  console.warn('Notifications unavailable in this runtime:', error);
}
