import { useAuth } from "../../../providers/AuthProvider";
import { Text } from "react-native";

export default function CommunitiesScreen() {
    const auth = useAuth();

    return <Text>{auth?.session?.user.id}</Text>
}