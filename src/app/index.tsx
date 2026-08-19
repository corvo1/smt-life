import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useHydrationController } from '@/controllers/useHydrationController';

export default function HydrationScreen() {
  const { todayMl, dailyGoalMl, logAmountMl, progress, logWater, permissionGranted, requestPermission } =
    useHydrationController();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 items-center justify-center gap-6 px-6">
        <Text className="text-2xl font-semibold text-black dark:text-white">Hydration</Text>

        <View className="h-4 w-full max-w-xs overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <View
            className="h-full rounded-full bg-sky-500"
            style={{ width: `${progress * 100}%` }}
          />
        </View>

        <Text className="text-base text-neutral-600 dark:text-neutral-400">
          {todayMl} / {dailyGoalMl} ml today
        </Text>

        <Pressable
          onPress={logWater}
          className="rounded-full bg-sky-500 px-6 py-3 active:opacity-80">
          <Text className="text-base font-medium text-white">+{logAmountMl}ml</Text>
        </Pressable>

        {!permissionGranted && (
          <Pressable onPress={requestPermission}>
            <Text className="text-sm text-sky-600 dark:text-sky-400">Enable reminders</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
