import { Redirect, Stack} from "expo-router";
import ChatProvider from "providers/ChatProvider";
import { Text } from "react-native-svg";
import TabNavigator from "./(tabs)/_layout";

export default function HomeLayout() {
  console.log('home again');
    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ChatProvider>
        
    );
}