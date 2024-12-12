import { Stack } from "expo-router";

export default function StartLayout() {

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(get-started)" options={{ title: 'Back', headerShown: false }} />
    </Stack>
  );
}