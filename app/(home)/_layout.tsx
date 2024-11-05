import { Stack, Redirect } from "expo-router";
import ChatProvider from "providers/ChatProvider";
import { useAuth } from '../../providers/AuthProvider'

export default function HomeLayout() {

    const { session } = useAuth();

    console.log("From HomeLayout: " + session);

    if (!session) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ChatProvider>
    )
}