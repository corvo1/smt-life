import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTasksController } from '@/controllers/useTasksController';

export default function TasksScreen() {
  const { title, setTitle, tasks, addTask, toggleTask, deleteTask } = useTasksController();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 gap-4 px-6 pt-4">
        <Text className="text-2xl font-semibold text-black dark:text-white">Tasks</Text>

        <View className="flex-row gap-2">
          <TextInput
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={addTask}
            placeholder="Add a task"
            placeholderTextColor="#9CA3AF"
            className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-black dark:border-neutral-700 dark:text-white"
          />
          <Pressable
            onPress={addTask}
            className="justify-center rounded-lg bg-sky-500 px-4 active:opacity-80">
            <Text className="font-medium text-white">Add</Text>
          </Pressable>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-900">
              <Pressable
                className="flex-1 flex-row items-center gap-3"
                onPress={() => toggleTask(item.id, item.completed)}>
                <View
                  className={`h-5 w-5 rounded border ${
                    item.completed
                      ? 'border-sky-500 bg-sky-500'
                      : 'border-neutral-400 dark:border-neutral-600'
                  }`}
                />
                <Text
                  className={`text-base ${
                    item.completed
                      ? 'text-neutral-400 line-through'
                      : 'text-black dark:text-white'
                  }`}>
                  {item.title}
                </Text>
              </Pressable>
              <Pressable onPress={() => deleteTask(item.id)}>
                <Text className="text-sm text-red-500">Delete</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
