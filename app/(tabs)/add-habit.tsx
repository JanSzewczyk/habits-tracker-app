import { View, StyleSheet } from "react-native";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FREQUENCIES, habitSchema, HabitSchemaType } from "~/schemas/habit";
import { useAuth } from "~/contexts/auth-context";
import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "~/lib/appwrite";
import { ID } from "react-native-appwrite";
import { useRouter } from "expo-router";

export default function AddHabitScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const styles = useThemedStyles();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(habitSchema)
  });

  async function onSubmit(data: HabitSchemaType) {
    if (!user) {
      return;
    }

    try {
      console.log("asd asd asd ");
      await databases.createDocument(DATABASE_ID, HABITS_COLLECTION_ID, ID.unique(), {
        userId: user.$id,
        title: data.title,
        description: data.description,
        frequency: data.frequency,
        streakCount: 0,
        lastCompletedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
      console.log("asd asd asd end");

      router.back();
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error creating habit:", e.message);
      }
      console.log("There was an error creating the habit:", e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formFieldContainer}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextInput label="Title" mode="outlined" value={value} onChangeText={onChange} error={!!errors.title} />
          )}
        />
        {errors.title ? (
          <Text variant="bodySmall" style={styles.error}>
            {errors.title.message}
          </Text>
        ) : null}
      </View>

      <View style={styles.formFieldContainer}>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Description"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors.description}
            />
          )}
        />
        {errors.description ? (
          <Text variant="bodySmall" style={styles.error}>
            {errors.description.message}
          </Text>
        ) : null}
      </View>

      <View style={styles.formFieldContainer}>
        <Controller
          control={control}
          name="frequency"
          render={({ field: { onChange, value } }) => (
            <SegmentedButtons
              buttons={FREQUENCIES.map((frequency) => ({
                value: frequency,
                label: frequency.charAt(0).toUpperCase() + frequency.slice(1)
              }))}
              value={value}
              onValueChange={onChange}
              multiSelect={false}
            />
          )}
        />
        {errors.frequency ? (
          <Text variant="bodySmall" style={styles.error}>
            {errors.frequency.message}
          </Text>
        ) : null}
      </View>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Add Habit
      </Button>
    </View>
  );
}

export function useThemedStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
      justifyContent: "center"
    },
    formFieldContainer: {
      marginBottom: 16
    },
    error: {
      color: theme.colors.error,
      marginTop: 8
    }
  });
}
