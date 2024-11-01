import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';

export default function AuthLayout() {
  const { session } = useAuth();

  console.log("From AuthLayout: " + session);

  if (session) {
    return <Redirect href="/(home)" />;
  }

  return <Stack />;
}
