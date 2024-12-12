import { useAuth } from '@useAuth';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const user = useAuth()?.user;

  if (user) {
    return <Redirect href="/(home)/(tabs)" />;
  }

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