import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useColorScheme } from 'react-native';

import '@/global.css';
import '@/notifications/config';
import { db } from '@/db/client';
import migrations from '@/db/migrations/migrations';
import AppTabs from '@/components/app-tabs';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <ThemedText type="title">Database error</ThemedText>
        <ThemedText>{error.message}</ThemedText>
      </ThemedView>
    );
  }

  if (!success) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ThemedText>Loading…</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}
