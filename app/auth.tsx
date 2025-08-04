import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { Button, TextInput, Text, useTheme } from "react-native-paper";
import * as React from "react";
import { useAuth } from "~/contexts/auth-context";

export default function AuthScreen() {
  const theme = useTheme();
  const { signUp, signIn } = useAuth();

  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [error, setError] = React.useState<string | null>(null);

  async function handleAuthenticate() {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);

    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      console.log("asd asda sda sd");
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
    }
  }

  function handleSwitchMode() {
    setIsSignUp((prev) => !prev);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>

        <TextInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          label="Password"
          autoCapitalize="none"
          mode="outlined"
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <Button mode="contained" onPress={handleAuthenticate} style={styles.button}>
          {isSignUp ? "Sigh Up" : "Sign In"}
        </Button>

        <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeButton}>
          {isSignUp ? "Already have an account? Sigh In" : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    marginBottom: 24
  },
  input: {
    marginBottom: 16
  },
  button: {
    marginTop: 8
  },
  switchModeButton: {
    marginTop: 16
  }
});
