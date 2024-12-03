import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '@useAuth';
import CommunityPage from './communityPage'
import editCommunities from './editCommunities';

const Drawer = createDrawerNavigator();

function CommunitiesScreen() {
    const auth = useAuth();

    // Check if mentorInterests exists and has content
    if (!auth?.mentorInterests || auth.mentorInterests.length === 0 ||
        !auth?.menteeInterests || auth.menteeInterests.length === 0
    ) {
        return (
            <View>
                <Text>No interests available.</Text>
            </View>
        );
    }

    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="Communities">
                {auth?.mentorInterests.map((interest) => (
                    <Drawer.Screen
                        key={interest.id}
                        name={interest.name}
                        component={CommunityPage} // Pass component directly
                        initialParams={{ name: interest.name }} // Pass initialParams with name
                    />
                ))}
                {auth?.menteeInterests.map((interest) => (
                    <Drawer.Screen
                        key={interest.id}
                        name={interest.name}
                        component={CommunityPage} // Pass component directly
                        initialParams={{ name: interest.name }} // Pass initialParams with name
                    />
                ))}
                <Drawer.Screen
                    key={0}
                    name={"Edit communities"}
                    component={editCommunities} // Pass component directly
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default CommunitiesScreen;
