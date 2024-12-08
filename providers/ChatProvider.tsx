import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from "./AuthProvider";
import { Redirect } from "expo-router";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const auth = useAuth();
  const profile = auth?.profile;
  const user = auth?.user;

  useEffect(() => {
    if (!user) {
      setIsLoggedOut(true);
      return;
    }

    if (!profile) {
      return;
    }

    if (client.userID === profile.id) {
      setIsReady(true);
      return;
    }


    const connect = async () => {
      try {
        console.log("Connecting user: ", profile.id);
        await client.connectUser(
          {
            id: profile.id,
            name: profile.full_name,
            image: profile.avatar_url,
          },
          client.devToken(profile.id)
        );
        setIsReady(true);
      } catch (err) {
        console.error("Error connecting user:", err);
      }
    };

    connect();

    return () => {
      if (isReady) {
        console.log("Disconnecting user...");
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [profile, user]);

  if (isLoggedOut) {
    return <Redirect href="/(auth)/login" />;
  }

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
  );
}
