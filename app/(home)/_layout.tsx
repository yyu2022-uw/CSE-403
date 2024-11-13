import { Redirect, Stack } from "expo-router";
// import ChatProvider from "providers/ChatProvider";
import { Text } from "react-native-svg";
import TabNavigator from "./(tabs)/_layout";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { useEffect } from "react";

const client = StreamChat.getInstance("cvvs6gq2ynqy");

export default function HomeLayout() {
    console.log('home again');

    useEffect(() => {
        const connect = async () => {
            await client.connectUser(
                {
                    id: 'jlahey',
                    name: 'Jim Lahey',
                    image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken('jlahey')
            );

            const channel = client.channel('messaging', 'the_park', {
                name: 'The Park',
            });

            await channel.watch();
        };

        connect();
    });

    return (
        <OverlayProvider>
            <Chat client={client}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </Chat>
        </OverlayProvider>
    );

    // return (
    //     // <OverlayProvider>
    //     //     <Chat client={client}>
    //     //         <ChatProvider>
    //     <Stack>
    //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     </Stack>
    //     //         </ChatProvider>
    //     //     </Chat>
    //     // </OverlayProvider>
    // );
}