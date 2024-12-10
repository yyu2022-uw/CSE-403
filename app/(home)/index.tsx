import { useAuth } from '@useAuth';
import { Redirect } from 'expo-router'

export default function HomeScreen() {
  const profile = useAuth()?.profile;

  if ((profile.full_name && profile.username)) {
    return <Redirect href={'/(home)/(tabs)/'} />;
  }

  return <Redirect href={'/(home)/(setup)/'} />;
}