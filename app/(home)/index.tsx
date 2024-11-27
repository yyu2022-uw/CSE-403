import { Redirect } from 'expo-router'
import { Text } from 'react-native-svg'

export default function HomeScreen() {
  return <Redirect href={'/(home)/(tabs)/communities'} />;
}