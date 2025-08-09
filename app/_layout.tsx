import { Stack, useRouter, useSegments } from "expo-router";
import * as React from "react";
import { AuthProvider, useAuth } from "~/contexts/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import "./global.css";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  React.useEffect(() => {
    const isAuthRoute = segments[0] === "auth";

    if ((!user && !isLoadingUser && !isAuthRoute) || (!user && !isLoadingUser)) {
      route.replace("/auth");
    } else if (user && !isLoadingUser && isAuthRoute) {
      route.replace("/");
    }
  }, [user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
