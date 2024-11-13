import { useAuth } from "../../../providers/AuthProvider";
import { Text } from "react-native";

export default function CommunitiesScreen() {
    return <Text>{useAuth()?.session?.user.id}</Text>
}