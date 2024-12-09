import { Stack } from "expo-router";

export default function MatchingLayout() {
    return (<Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>);
}