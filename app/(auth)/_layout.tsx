import { Redirect, Stack } from 'expo-router';
import { useAuth } from 'context/AuthContext';

export default function AuthLayout() {
  const { user } = useAuth();

  console.log("From AuthLayout: " + user);

  if (user) {
    return <Redirect href="/(home)" />;
  }

  return <Stack />;
}
