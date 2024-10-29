import { Redirect } from 'expo-router';

export default function HomeScreen() {

    // Change which one of these is commented if you want to skip login 
    return <Redirect href={'/(auth)/login'} />;
    //return <Redirect href={'/(home)/(tabs)'} />;
}
