import { Stack } from 'expo-router';

export default function AuthLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="start-page"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}