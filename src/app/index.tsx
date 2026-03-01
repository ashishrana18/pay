import { Link, router } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/transaction" style={{cursor: "pointer", marginBottom: 10}}><Text>Hello</Text></Link>
      <Text>payLOG</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
