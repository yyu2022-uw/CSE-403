import { View, Text } from 'react-native'
import { Link, Redirect } from 'expo-router'

export default function HomeScreen() {
    return <Redirect href={'/(auth)/login'} />
}