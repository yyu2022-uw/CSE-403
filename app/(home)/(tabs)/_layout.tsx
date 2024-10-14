import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabNavigator() {
    return <Tabs>
        <Tabs.Screen
            name="communities"
            options={{
                title: 'Communities',
                tabBarIcon: ({ size, color }) => <FontAwesome5 name="home" size={size} color={color} />
            }}
        />
        <Tabs.Screen
            name="chat"
            options={{
                title: 'Chat',
                tabBarIcon: ({ size, color }) => <FontAwesome6 name="message" size={size} color={color} />
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({ size, color }) => <FontAwesome5 name="user-alt" size={size} color={color} />
            }}
        />
    </Tabs>
}