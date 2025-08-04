import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "~/contexts/auth-context";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Button mode="text" onPress={signOut} icon="logout">
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  navButton: {
    width: 100,
    height: 32,
    backgroundColor: "blue",
    color: "white",
    textAlign: "center",
    lineHeight: 32
  }
});
