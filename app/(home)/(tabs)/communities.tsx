import { useAuth } from "../../../providers/AuthProvider";
import { Slot, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function CommunitiesScreen() {
    const { session, loading } = useAuth();

    return <Text>{session?.user.id}</Text>
}