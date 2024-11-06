import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from "./AuthProvider";

// This constant needs to be replaced with the environment variable, but for some reason I'm having issues here.
//const client = StreamChat.getInstance('kcg53pa793bv');
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);


export default function ChatProvider ({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const profile = useAuth()?.profile;

    useEffect(() => {
        if(!profile) {
            return;
        }

        console.log("From chatProvider: " + profile.id);

        const connect = async () => {
            await client.connectUser(
                {
                    id: profile.id,
                    name: profile.full_name,
                    image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken(profile.id),
            );
            setIsReady(true);
        }

        connect();

        return () => {
            if(isReady){
                client.disconnectUser();
            }
            setIsReady(false);
        }
    }, [profile?.id])

    if(!isReady) {
        // Make some styling for this later
        return <ActivityIndicator />;
    }

    return (
        <OverlayProvider>
            <Chat client={client}>{children}</Chat>
        </OverlayProvider>

    )
}