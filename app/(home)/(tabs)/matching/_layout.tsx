import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function MatchingLayout() {
    return (<Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>);
}