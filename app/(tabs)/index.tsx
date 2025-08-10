import { View, ScrollView, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "~/contexts/auth-context";
import { client, DATABASE_ID, databases, HABITS_COLLECTION_ID, HABITS_COMPLETIONS_COLLECTION_ID } from "~/lib/appwrite";
import { ID, Query, RealtimeResponseEvent } from "react-native-appwrite";
import * as React from "react";
import { Habit, HabitCompletion } from "~/types/database";
import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import { HabitCard } from "~/components/habit-card";

export default function Index() {
  const { signOut, user } = useAuth();

  const [habits, setHabits] = React.useState<Array<Habit>>([]);
  const [completedHabits, setCompletedHabits] = React.useState<Array<HabitCompletion>>([]);

  const swipeableRefs = React.useRef<{ [key: string]: SwipeableMethods | null }>({});

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

  async function fetchTodayCompletions() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const response = await databases.listDocuments(DATABASE_ID, HABITS_COMPLETIONS_COLLECTION_ID, [
        Query.equal("userId", user?.$id ?? ""),
        Query.greaterThanEqual("completedAt", today.toISOString())
      ]);

      const completions = response.documents as unknown as Array<HabitCompletion>;
      setCompletedHabits(completions);
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
        void fetchTodayCompletions();
      }
    });

    void fetchHabits();
    void fetchTodayCompletions();

    return () => {
      habitsSubscription();
      completionsSubscription();
    };
  }, [user]);

  async function handleRightAction(habitId: string) {
    if (!user || completedHabits.map((completedHabit) => completedHabit.habitId).includes(habitId)) {
      return;
    }

    try {
      await databases.deleteDocument(DATABASE_ID, HABITS_COLLECTION_ID, habitId);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCompleteHabit(habitId: string) {
    if (!user || completedHabits.map((completedHabit) => completedHabit.habitId).includes(habitId)) {
      return;
    }

    const currentDate = new Date().toISOString();
    try {
      await databases.createDocument(DATABASE_ID, HABITS_COMPLETIONS_COLLECTION_ID, ID.unique(), {
        habitId,
        userId: user?.$id,
        completedAt: currentDate
      });

      const habit = habits.find((h) => h.$id === habitId);
      if (!habit) {
        return;
      }

      await databases.updateDocument(DATABASE_ID, HABITS_COLLECTION_ID, habitId, {
        streakCount: habit.streakCount + 1,
        lastCompletedAt: currentDate
      });
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  }

  const isHabitCompleted = (habitId: string) =>
    completedHabits.map((completedHabit) => completedHabit.habitId).includes(habitId);

  return (
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between p-4">
        <Text className="text-3xl font-extrabold">Today's Habits</Text>
        <Button mode="text" onPress={signOut} icon="logout">
          Sign Out
        </Button>
      </View>
      {habits.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.$id}
              onSwipeableOpen={(direction) => {
                if (direction === "left") {
                  void handleCompleteHabit(habit.$id);
                }
                if (direction === "right") {
                  void handleRightAction(habit.$id);
                }

                swipeableRefs.current[habit.$id]?.close();
              }}
              habit={habit}
              ref={(ref) => {
                swipeableRefs.current[habit.$id] = ref;
              }}
              isCompleted={isHabitCompleted(habit.$id)}
            />
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
