import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

// This constant needs to be replaced with the environment variable, but for some reason I'm having issues here.
const client = StreamChat.getInstance('kcg53pa793bv');
//const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_KEY);


export default function ChatProvider ({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const connect = async () => {
            await client.connectUser(
                {
                    id: 'jlahey',
                    name: 'Jim Lahey',
                    image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken('jlahey'),
            );
            setIsReady(true);

            // const channel = client.channel('messaging', 'just_chatting', {
            //     // image: 'https://cdn.com/image.png',
            //     name: 'Just Chatting',
            //     // members: ['dave-matthews', 'trey-anastasio'],
            //     // option to add custom fields
            // });
            // await channel.watch();
        }

        connect();

        return () => {
            client.disconnectUser();
            setIsReady(false);
        }
    }, [])

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