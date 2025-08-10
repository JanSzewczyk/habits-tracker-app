import { View, Text, ScrollView } from "react-native";
import { useAuth } from "~/contexts/auth-context";
import * as React from "react";
import { Habit, HabitCompletion } from "~/types/database";
import { client, DATABASE_ID, databases, HABITS_COLLECTION_ID, HABITS_COMPLETIONS_COLLECTION_ID } from "~/lib/appwrite";
import { Query, RealtimeResponseEvent } from "react-native-appwrite";
import { Card } from "react-native-paper";

type StreakData = {
  streak: number;
  bestStreak: number;
  total: number;
};

export default function StreaksScreen() {
  const { user } = useAuth();

  const [habits, setHabits] = React.useState<Array<Habit>>([]);
  const [completedHabits, setCompletedHabits] = React.useState<Array<HabitCompletion>>([]);

  async function fetchHabits() {
    try {
      const response = await databases.listDocuments(DATABASE_ID, HABITS_COLLECTION_ID, [
        Query.equal("userId", user?.$id ?? "")
      ]);

      setHabits(response.documents as unknown as Array<Habit>);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCompletions() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const response = await databases.listDocuments(DATABASE_ID, HABITS_COMPLETIONS_COLLECTION_ID, [
        Query.equal("userId", user?.$id ?? "")
      ]);

      setCompletedHabits(response.documents as unknown as Array<HabitCompletion>);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    const habitsChanel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`;
    const habitsSubscription = client.subscribe(habitsChanel, (response: RealtimeResponseEvent<any>) => {
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        void fetchHabits();
      } else if (response.events.includes("databases.*.collections.*.documents.*.update")) {
        void fetchHabits();
      } else if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        void fetchHabits();
      }
    });

    const completionsChanel = `databases.${DATABASE_ID}.collections.${HABITS_COMPLETIONS_COLLECTION_ID}.documents`;
    const completionsSubscription = client.subscribe(completionsChanel, (response: RealtimeResponseEvent<any>) => {
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        void fetchCompletions();
      }
    });

    void fetchHabits();
    void fetchCompletions();

    return () => {
      habitsSubscription();
      completionsSubscription();
    };
  }, [user]);

  const getStreakData = (habitId: string): StreakData => {
    const habitCompletions = completedHabits
      .filter((completion) => completion.habitId === habitId)
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

    if (!habitCompletions.length) {
      return { streak: 0, bestStreak: 0, total: 0 };
    }

    let streak = 0;
    let bestStreak = 0;
    const total = habitCompletions.length;

    let lastDate: Date | null = null;
    let currentStreak = 0;

    habitCompletions.forEach((completion) => {
      const date = new Date(completion.completedAt);

      if (lastDate) {
        const diff = (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diff <= 1.5) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }

      streak = currentStreak;
      lastDate = date;
    });

    return { streak, bestStreak, total };
  };

  const habitsStreak = habits.map((habit) => {
    const { streak, bestStreak, total } = getStreakData(habit.$id);

    return {
      habit,
      bestStreak,
      total,
      streak
    };
  });

  const rankedHabits = habitsStreak.sort((a, b) => b.bestStreak - a.bestStreak);

  return (
    <View className="flex-1">
      <Text className="p-4 text-2xl font-bold">Habit Streaks</Text>

      {rankedHabits.length ? (
        <View className="mx-4 mb-6 rounded-lg bg-white p-4 shadow-md">
          <Text className="mb-3 text-xl font-bold text-purple-500">🎖️ Top Streaks</Text>

          <View className="divide-y divide-neutral-200">
            {rankedHabits.slice(0, 3).map((item, key) => (
              <View key={item.habit.$id} className="flex-row items-center py-2">
                <View className="mr-2 size-6 items-center justify-center rounded-2xl bg-neutral-400">
                  <Text>{key + 1}</Text>
                </View>
                <Text className="flex-1 text-lg text-neutral-700">{item.habit.title}</Text>
                <Text className="text-lg font-bold text-neutral-900">{item.bestStreak}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {habits.length ? (
        <ScrollView showsVerticalScrollIndicator={false} className="">
          {rankedHabits.map(({ habit, bestStreak, streak, total }) => (
            <Card key={habit.$id} className="mx-4 my-2 bg-white">
              <Card.Content>
                <Text className="text-lg font-bold text-neutral-900">{habit.title}</Text>
                <Text className="text-neutral-500">{habit.description}</Text>
                <View className="flex-row justify-between pt-4">
                  <View className="w-24 items-center rounded-xl bg-red-100 p-2">
                    <Text className="text-lg font-semibold text-neutral-900">🔥 {streak}</Text>
                    <Text className="text-sm text-neutral-500">Current</Text>
                  </View>

                  <View className="w-24 items-center rounded-xl bg-amber-100 p-2">
                    <Text className="text-lg font-semibold text-neutral-900">🏆 {bestStreak}</Text>
                    <Text className="text-sm text-neutral-500">Best</Text>
                  </View>

                  <View className="w-24 items-center rounded-xl bg-green-100 p-2">
                    <Text className="text-lg font-semibold text-neutral-900">✅ {total}</Text>
                    <Text className="text-sm text-neutral-500">Total</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl text-neutral-500">No Habits yet. Add your first Habit!</Text>
        </View>
      )}
    </View>
  );
}
