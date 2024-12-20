import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthProvider } from "@useAuth";
import { supabase } from "lib/supabase";
import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function TabNavigator() {

    return <AuthProvider>
        <Tabs>
            <Tabs.Screen
                name="communities"
                options={{
                    title: 'Communities',
                    tabBarIcon: ({ size, color }) => <FontAwesome5 name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="matching"
                options={{
                    title: 'Matching',
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => <FontAwesome5 name="user-friends" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ size, color }) => <FontAwesome6 name="message" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ size, color }) => <FontAwesome6 name="circle-user" size={size} color={color} />,
                    headerRight: () => <AntDesign name="logout" size={22} color="black" onPress={() => {
                        supabase.auth.signOut();
                        client.disconnectUser();
                    }

                    } style={{ marginRight: 25 }} />
                }
                }
            />
        </Tabs>
    </AuthProvider>
}