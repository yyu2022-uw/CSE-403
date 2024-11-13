import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

function CommunityPage({ route }) {
    const { name } = route.params; // Access the name passed via initialParams

    return (
        <View>
            <Text>Welcome to the community: {name}</Text>
        </View>
    );
}

export default CommunityPage;
