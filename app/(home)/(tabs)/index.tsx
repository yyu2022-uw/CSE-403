import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { Text } from "react-native-svg";

export default function ChatScreen() {
  return <ChannelList onSelect={(channel) => router.push(`/channel/${channel.cid}`)} />;
}