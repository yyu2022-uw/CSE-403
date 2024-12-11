import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from "./AuthProvider";
import { Redirect } from "expo-router";
import { StreamChat } from 'stream-chat';

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
        console.log("user", user)
        console.log("profile", profile)
        console.log("isLoggedOut ", isLoggedOut);
        console.log("Connecting user: ", profile.id);
        await client.connectUser(
          {
            id: profile.id,
            name: profile.full_name, // none yet before setup
            image: profile.avatar_url, // none yet before setup
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
    return <Redirect href="/(start)/(auth)/login" />;
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