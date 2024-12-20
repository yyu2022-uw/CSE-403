import { Stack } from "expo-router";
import ChatProvider from "providers/ChatProvider";

export default function HomeLayout() {
    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ title: 'Back', headerShown: false }} />
                <Stack.Screen name="(setup)" options={{ headerShown: false }} />
                <Stack.Screen name="channel" options={{ title: 'Chat' }} />
            </Stack>
        </ChatProvider>
    );
}