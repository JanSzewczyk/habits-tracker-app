import { Models } from "react-native-appwrite";

export type Habit = Models.Document & {
  createdAt: string;
  title: string;
  description: string;
  frequency: string;
  lastCompletedAt: string;
  streakCount: number;
  userId: string;
};

export type HabitCompletion = Models.Document & {
  userId: string;
  habitId: string;
  completedAt: string;
};
