import { Stack, Slot } from 'expo-router';

export default function SetUpLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Setup",
        }}
      />
    </Stack>
  );
}