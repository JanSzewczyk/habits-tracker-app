import * as React from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "~/lib/appwrite";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;

  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthContextType["user"]>(null);
  const [isLoadingUser, setIsLoadingUser] = React.useState<boolean>(true);

  React.useEffect(() => {
    void getUser();
  }, []);

  async function getUser() {
    try {
      const session = await account.get();
      setUser(session);
    } catch {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }

    await SplashScreen.hideAsync();
  }

  async function signIn(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);

      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unexpected error occurred during signin.";
    }
  }

  async function signUp(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unexpected error occurred during signup.";
    }
  }

  async function signOut() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, isLoadingUser, signOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
