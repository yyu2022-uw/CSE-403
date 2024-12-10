import { Slot } from "expo-router";
import ChatProvider from "providers/ChatProvider";

export default function HomeLayout() {
    return (
        <ChatProvider>
            <Slot />
        </ChatProvider>
    );
}