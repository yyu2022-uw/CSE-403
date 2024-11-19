import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { Text } from "react-native-svg";
import { useAuth } from '../../../providers/AuthProvider';

export default function ChatScreen() {
  const profile  = useAuth()?.profile;
  console.log('in tabs');
  // return <Text>Something</Text>;
   return <ChannelList 
      filters={{ members: { $in: [profile.id ]}}} 
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)} 
   />;
}