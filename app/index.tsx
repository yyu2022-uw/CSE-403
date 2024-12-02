// AppScreen.tsx
import { View } from 'react-native';
import { useAuth } from 'providers/AuthProvider';
import Auth from '../components/login/Auth';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import HomeScreen from './(home)';

export default function AppScreen() {
    console.log("in app screen");
    const auth = useAuth();

    if (auth?.loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (auth?.session && auth?.user) {
        return <HomeScreen />
    } else {
        return <Auth />;
    }
}