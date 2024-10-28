import { Redirect } from "expo-router";
import { Text } from "react-native";

export default function MatchingScreen() {
  return <Redirect href={'/(home)/(tabs)/matching/home'} />
}
