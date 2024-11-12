import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Channel as ChannelType } from "stream-chat";
import { ActivityIndicator, View } from "react-native";
import { Channel, MessageList, MessageInput, useChatContext } from "stream-chat-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChannelScreen() {
    const [channel, setChannel] = useState<ChannelType | null>(null);
    const { cid } = useLocalSearchParams<{ cid: string }>();
    const { client } = useChatContext();

    useEffect(() => {
        const fetchChannel = async () => {
            const channels = await client.queryChannels({ cid })
            setChannel(channels[0])
        }

        fetchChannel()
    }, [cid]);

    if (!channel) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
        );
    }

    return (
        <Channel channel={channel}>
            <MessageList />
            <SafeAreaView edges={['bottom']}>
                <MessageInput />
            </SafeAreaView>
        </Channel>
    );
}