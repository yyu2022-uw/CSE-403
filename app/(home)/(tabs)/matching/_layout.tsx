import { Stack } from "expo-router";

export default function MatchingLayout() {
    return (<Stack>
        <Stack.Screen name="home" options={{ title: 'Back', headerShown: false }} />
    </Stack>);
}