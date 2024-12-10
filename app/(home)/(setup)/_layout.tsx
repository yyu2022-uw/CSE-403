import { Stack } from 'expo-router';

export default function SetUpLayout() {
  return (<Stack>
    <Stack.Screen name="setup" options={{ headerShown: false }} />
  </Stack>);
}