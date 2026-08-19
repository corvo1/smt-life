import * as Notifications from 'expo-notifications';
import { create } from 'zustand';

type NotificationState = {
  permissionGranted: boolean;
  checkPermission: () => Promise<void>;
  requestPermission: () => Promise<void>;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  permissionGranted: false,
  checkPermission: async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      set({ permissionGranted: status === 'granted' });
    } catch (error) {
      console.warn('Notifications unavailable in this runtime:', error);
    }
  },
  requestPermission: async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      set({ permissionGranted: status === 'granted' });
    } catch (error) {
      console.warn('Notifications unavailable in this runtime:', error);
    }
  },
}));
