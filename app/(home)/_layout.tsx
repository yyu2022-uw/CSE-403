import { Stack } from "expo-router";
import ChatProvider from "providers/ChatProvider";
import { Text } from "react-native-svg";
import TabNavigator from "./(tabs)/_layout";
import { useAuth } from "../../providers/AuthProvider";
import Auth from "@/components/login/Auth";

export default function HomeLayout() {
    const user = useAuth();
    console.log('home again');

    
    if (!user) {
        return <Auth />
    }

    return (
    <ChatProvider>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </ChatProvider>
    );
}