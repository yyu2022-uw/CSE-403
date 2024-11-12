// AppScreen.tsx
import { View } from 'react-native';
import { useAuth } from 'providers/AuthProvider';
import Auth from '../components/login/Auth';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

import HomeScreen from './(home)';

export default function AppScreen() {
    const auth = useAuth();

    if (auth?.loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (auth?.session && auth?.user) {
        // Redirect to home page
        // return <Redirect href={'/(home)'} />;
        return <HomeScreen />
    } else {
        return <Auth />;
    }
}
// // AppScreen.tsx
// import { View } from 'react-native';
// import { AuthProvider, useAuth } from 'providers/AuthProvider';
// import Auth from '../components/login/Auth';
// import Profile from './(home)/(tabs)/profile';
// import CommunitiesScreen from './(home)/(tabs)/communities';

// export default function AppScreen() {
//     return (
//         <AuthProvider>
//             <Main />
//         </AuthProvider>
//     );
// }

// const Main = () => {
//     const { session, loading } = useAuth();

//     if (loading) {
//         return <View>{/* You can add a loading indicator here */}</View>;
//     }

//     return (
//         <View>
//             {session && session.user ? (
//                 // Redirect to Profile screen after successful login
//                 <Profile />
//             ) : (
//                 <Auth />
//             )}
//         </View>
//     );
// };
