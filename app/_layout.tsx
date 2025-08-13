import { Stack } from "expo-router";
import * as React from "react";
import { AuthProvider, useAuth } from "~/contexts/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import "./global.css";

function RootStack() {
  const { user } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="auth" options={{ headerShown: false, animation: "none" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <RootStack />
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
