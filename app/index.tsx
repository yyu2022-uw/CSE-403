import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function HomeScreen() {
    return (
        <View>
            <Link href={{ pathname: '/login' }}>
                <Text>Log in</Text>
            </Link>
        </View>
    )
}