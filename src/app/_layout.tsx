import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "payLOG" }}></Stack.Screen>
      <Stack.Screen
        name="transaction"
        options={{ title: "Transaction Details", headerBackButtonDisplayMode:"minimal" }}
      ></Stack.Screen>
      <Stack.Screen
        name="new"
        options={{ title: "New Transaction", headerBackButtonDisplayMode:"minimal" }}
      ></Stack.Screen>
    </Stack>
  );
}
