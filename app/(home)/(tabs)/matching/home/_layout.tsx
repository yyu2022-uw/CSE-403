import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { supabase } from 'lib/supabase';
import { useAuth } from 'context/AuthContext';
import { Redirect } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MentorCommunityScreen from '.';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [communities, setCommunities] = useState<{ cid: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  // const { user } = useAuth();
  const user = '216e4cc6-3e5e-4d30-a033-5690963dccce';

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        let { data: userCommunities, error } = await supabase
          .from('user_communities')
          .select(`
            cid,
            communities (name)
          `)
          .eq('uid', user);

        if (error) {
          throw error;
        }

        if (userCommunities) {
          // Store both 'cid' and 'name' in the state
          const community = userCommunities.map((uc: any) => ({
            cid: uc.cid,
            name: uc.communities.name,
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
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="Matching">
      {communities.map((community, index) => (
        <Drawer.Screen
          key={index}
          name={community.name}
          component={MentorCommunityScreen}
          initialParams={{ cid: community.cid, name: community.name }}
          options={{
            drawerLabel: community.name,
            title: "Matching",
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

