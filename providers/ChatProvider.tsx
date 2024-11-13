import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from "./AuthProvider";

// This constant needs to be replaced with the environment variable, but for some reason I'm having issues here.
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const profile = useAuth()?.profile;

  useEffect(() => {
    console.log(profile);
    if (!profile) {
      return;
    }

    console.log("From chatProvider: " + profile.id);

    const connect = async () => {
      try {
        await client.connectUser(
          {
            id: profile.id,
            name: profile.full_name,
            image: 'https://i.imgur.com/fR9Jz14.png',
          },
          client.devToken(profile.id),
        );
        setIsReady(true);
      } catch (err) {
        console.log(profile);
        console.error(err);
      }
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    }
  }, [profile?.id])

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>

  )
}