import { View, Text } from 'react-native'
import { Link, Redirect } from 'expo-router'

export default function HomeScreen() {
    // return (
    //     <View>
    //         <Text>Home screen</Text>
    //     </View>
    // )

    return (
        <Redirect href={'/(home)/(tabs)/communities'} />
    )
}