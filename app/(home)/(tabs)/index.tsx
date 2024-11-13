import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";

export default function ChatScreen() {
  return <ChannelList onSelect={(channel) => router.push(`/channel/${channel.cid}`)} />;
}