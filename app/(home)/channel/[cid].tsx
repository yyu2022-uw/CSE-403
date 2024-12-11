import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Channel as ChannelType } from "stream-chat";
import { ActivityIndicator, View } from "react-native";
import { Channel, MessageList, MessageInput, useChatContext } from "stream-chat-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function ChannelScreen() {
    const { cid } = useLocalSearchParams<{ cid: string }>();
    const [channel, setChannel] = useState<ChannelType | null>(null);
    const { client } = useChatContext();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchChannel = async () => {
            const channels = await client.queryChannels({ cid });
            if (channels.length > 0) {
                const channel = channels[0];
                setChannel(channel);

                // Dynamically set the title to the name of the person you're chatting with
                const members = Object.values(channel.state.members).filter(
                    (member) => member.user?.id !== client.userID
                );
                const personName = members[0]?.user?.name || "Chat";
                navigation.setOptions({
                    // title: `Chat with ${personName}`,
                    headerTitle: `${personName}`
                });
            }
        };

        fetchChannel();
    }, [cid, client, navigation]);

    if (!channel) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Channel channel={channel}>
            <MessageList />
            <SafeAreaView edges={["bottom"]}>
                <MessageInput />
            </SafeAreaView>
        </Channel>
    );
}
