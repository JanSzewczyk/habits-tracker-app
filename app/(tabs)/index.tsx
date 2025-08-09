import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { useAuth } from "~/contexts/auth-context";
import { client, DATABASE_ID, databases, HABITS_COLLECTION_ID } from "~/lib/appwrite";
import { Query, RealtimeResponseEvent } from "react-native-appwrite";
import * as React from "react";
import { Habit } from "~/types/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  const { signOut, user } = useAuth();
  const styles = useThemedStyles();

  const [habits, setHabits] = React.useState<Array<Habit>>([]);

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

  React.useEffect(() => {
    const chanel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`;
    const habitsSubscription = client.subscribe(chanel, (response: RealtimeResponseEvent<any>) => {
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        void fetchHabits();
      } else if (response.events.includes("databases.*.collections.*.documents.*.update")) {
        void fetchHabits();
      } else if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        void fetchHabits();
      }
    });
    void fetchHabits();

    return () => {
      habitsSubscription();
    };
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Today's Habits
        </Text>
        <Button mode="text" onPress={signOut} icon="logout">
          Sign Out
        </Button>
      </View>

      <ScrollView>
        {habits.length ? (
          habits.map((habit) => (
            <Surface key={habit.id} style={styles.card} elevation={0}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{habit.title}</Text>
                <Text style={styles.cardDescription}>{habit.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.streakBadge}>
                    <MaterialCommunityIcons name="fire" size={18} color={""} />
                    <Text style={styles.streakText}>{habit.streakCount} day streak</Text>
                  </View>
                  <View style={styles.frequencyBadge}>
                    <Text style={styles.frequencyText}>{habit.frequency.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </Surface>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No Habits yet. Add your first Habit!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export function useThemedStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24
    },
    title: {
      fontWeight: "bold"
    },

    card: {
      marginBottom: 18,
      borderRadius: 18,
      backgroundColor: theme.colors.surfaceVariant,
      shadowColor: theme.colors.onSurface,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4
    },
    cardContent: {
      padding: 20
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
      color: theme.colors.onPrimaryContainer
    },
    cardDescription: {
      fontSize: 16,
      marginBottom: 16,
      color: theme.colors.onPrimaryContainer,
      opacity: 0.8
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },

    streakBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.tertiaryContainer,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 4
    },
    streakText: {
      marginLeft: 6,
      color: theme.colors.onTertiaryContainer,
      fontWeight: "bold",
      fontSize: 14
    },

    frequencyBadge: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 4
    },
    frequencyText: {
      color: theme.colors.onPrimaryContainer,
      fontWeight: "bold",
      fontSize: 14
    },

    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyStateText: {
      color: theme.colors.onSurfaceVariant
    }
  });
}
