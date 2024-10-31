import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';

export default function AuthLayout() {
  const { user } = useAuth();

  console.log("From AuthLayout: " + user);

  if (user) {
    return <Redirect href="/(home)" />;
  }

  return <Stack />;
}
