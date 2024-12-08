import { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { supabase } from 'lib/supabase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MentorCommunityScreen from '.';
import { useAuth } from '@useAuth';
import { Redirect, useFocusEffect } from 'expo-router';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const [communities, setCommunities] = useState<{ iid: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useAuth()?.user;

    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }

    useFocusEffect(
        useCallback(() => {
            const fetchCommunities = async () => {
                try {
                    let { data: userCommunities } = await supabase
                        .from('user_interests')
                        .select(`
            iid,
            interests (name)
          `)
                        .eq('uid', user.id)

                    if (userCommunities) {
                        // Store both 'iid' and 'name' in the state
                        const community = userCommunities.map((uc: any) => ({
                            iid: uc.iid,
                            name: uc.interests.name,
                        }));
                        setCommunities(community);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch communities:', error);
                    setLoading(false);
                }
            };

            fetchCommunities();
        }, [user]));

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (communities.length === 0) {
        return <Redirect href={'/(home)/(tabs)/communities'} />;
    }

    return (
        <Drawer.Navigator initialRouteName="Matching">
            {communities.map((community, index) => (
                <Drawer.Screen
                    key={index}
                    name={community.name}
                    component={MentorCommunityScreen}
                    initialParams={{ iid: community.iid, name: community.name }}
                    options={{
                        drawerLabel: community.name,
                        title: "Matching",
                    }}
                />
            ))}
        </Drawer.Navigator>
    );
}