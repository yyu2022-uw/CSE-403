import { Stack, Slot } from "expo-router";
import ChatProvider from "providers/ChatProvider";
import { useEffect } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance('kcg53pa793bv');

export default function HomeLayout() {

    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ChatProvider>
    )
}