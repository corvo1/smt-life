import { desc, eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useState } from 'react';

import { db } from '@/db/client';
import { tasks } from '@/db/schema';

export function useTasksController() {
  const [title, setTitle] = useState('');
  const { data } = useLiveQuery(db.select().from(tasks).orderBy(desc(tasks.createdAt)));

  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    db.insert(tasks).values({ title: trimmed, createdAt: new Date() });
    setTitle('');
  };

  const toggleTask = (id: number, completed: boolean) => {
    db.update(tasks).set({ completed: !completed }).where(eq(tasks.id, id));
  };

  const deleteTask = (id: number) => {
    db.delete(tasks).where(eq(tasks.id, id));
  };

  return {
    title,
    setTitle,
    tasks: data ?? [],
    addTask,
    toggleTask,
    deleteTask,
  };
}
