// AppScreen.tsx
import { View } from 'react-native';
import { AuthProvider, useAuth } from 'providers/AuthProvider';
import Auth from '../components/login/Auth';
import Profile from './(home)/(tabs)/profile';
import CommunitiesScreen from './(home)/(tabs)/communities';

export default function AppScreen() {
    return (
        <AuthProvider>
            <Main />
        </AuthProvider>
    );
}

const Main = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <View>{/* You can add a loading indicator here */}</View>;
    }

    return (
        <View>
            {session && session.user ? (
                // Redirect to Profile screen after successful login
                <Profile />
            ) : (
                <Auth />
            )}
        </View>
    );
};
