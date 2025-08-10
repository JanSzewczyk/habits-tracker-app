import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import classNames from "classnames";
import ReanimatedSwipeable, { SwipeableRef, SwipeableProps } from "react-native-gesture-handler/ReanimatedSwipeable";
import * as React from "react";
import { Habit } from "~/types/database";

export type HabitCardProps = {
  ref: SwipeableRef;
  onSwipeableOpen?: SwipeableProps["onSwipeableOpen"];
  habit: Habit;
  isCompleted: boolean;
};

export function HabitCard({ ref, onSwipeableOpen, habit, isCompleted }: HabitCardProps) {
  return (
    <ReanimatedSwipeable
      ref={ref}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={() => (
        <View className="mx-4 my-2 flex-1 items-start justify-center rounded-2xl bg-red-300/50 pl-4">
          {isCompleted ? (
            <Text className="text-lg font-semibold text-red-600">Completed!</Text>
          ) : (
            <MaterialCommunityIcons name="trash-can-outline" size={32} color="#dc2626" />
          )}
        </View>
      )}
      renderRightActions={() => (
        <View className="mx-4 my-2 flex-1 items-end justify-center rounded-2xl bg-green-300/50 pr-4">
          {isCompleted ? (
            <Text className="text-lg font-semibold text-green-600">Completed!</Text>
          ) : (
            <MaterialCommunityIcons name="check-circle-outline" size={32} color="#16a34a" />
          )}
        </View>
      )}
      onSwipeableOpen={onSwipeableOpen}
    >
      <View className="mx-4 my-2 rounded-2xl bg-white shadow-md">
        <View className={classNames("p-6", isCompleted && "opacity-50")}>
          <Text className="mb-2 text-xl font-bold text-neutral-900">{habit.title}</Text>
          <Text className="font-medium text-neutral-700">{habit.description}</Text>
          <View className="mt-4 flex-row items-center justify-between">
            <View className="flex-row items-center rounded-md bg-yellow-500 px-2 py-1">
              <MaterialCommunityIcons name="fire" size={18} color="#854d0e" />
              <Text className="font-bold text-yellow-800">{habit.streakCount} day streak</Text>
            </View>

            <View className="flex-row items-center rounded-md bg-blue-500 px-2 py-1">
              <Text className="font-bold text-blue-800">{habit.frequency.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
}
