import { useCallback, useState } from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import { supabase } from 'lib/supabase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MentorCommunityScreen from '.';
import { useAuth } from '@useAuth';
import { Redirect, useFocusEffect } from 'expo-router';

const Drawer = createDrawerNavigator();

function NoCommunitiesScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No communities to display</Text>
        </View>
    );
}

export default function DrawerNavigator() {
    const [communities, setCommunities] = useState<{ iid: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [alertShown, setAlertShown] = useState(false);
    const user = useAuth()?.user;

    if (!user) {
        return <Redirect href="/(start)/(auth)/login" />;
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
                            is_mentor
                        `)
                        .eq('uid', user.id);

                    if (userCommunities) {
                        const community = userCommunities.map((uc: any) => ({
                            iid: uc.iid,
                            name: uc.interests.name,
                            isMentor: uc.is_mentor == "true" ? true : false,
                        }));

                        const sortedCommunities = community.sort((a, b) => {
                            if (a.isMentor && !b.isMentor) return -1;
                            if (!a.isMentor && b.isMentor) return 1;
                            return 0;
                        });

                        setCommunities(sortedCommunities);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch communities:', error);
                    setLoading(false);
                }
            };

            fetchCommunities();
        }, [user])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (communities.length === 0 && !alertShown) {
        Alert.alert('No communities joined', 'To begin mentor matching, you need to join a community first');
        setAlertShown(true);
        return <Redirect href={'/(home)/(tabs)/communities'} />;
    }

    return (
        <Drawer.Navigator initialRouteName="Matching">
            {communities.length > 0 ? (
                communities
                    .filter((value, index, self) =>
                        // Only keep communities with unique 'iid'
                        index === self.findIndex((t) => t.iid === value.iid)
                    )
                    .map((community, index) => (
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
                    ))
            ) : (
                <Drawer.Screen
                    name="No Communities"
                    component={NoCommunitiesScreen}
                    options={{
                        drawerLabel: "No Communities",
                        title: "No Communities",
                    }}
                />
            )}
        </Drawer.Navigator>
    );
}
