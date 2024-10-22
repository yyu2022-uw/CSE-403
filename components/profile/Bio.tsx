import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { spacing } from '@Spacing'
import { sizes } from '@Sizes'
import { useUser } from '@useUser';
import { Colors } from '@Colors';

interface BioProps {
    editing: boolean;
}

export default function Bio({ editing }: BioProps) {
    const { user, setUser } = useUser();
    const [editableBioText, setEditableBioText] = useState(user.bio);

    const saveBio = () => {
        setUser({ ...user, bio: editableBioText });
    };

    if (!editing) {
        return (
            <View style={styles.container}>
                <Text style={sizes.plainText}>{user.bio}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[sizes.plainText, styles.input]}
                    value={editableBioText}
                    onChangeText={setEditableBioText}
                    onBlur={saveBio}
                    placeholder="Write your biography..."
                    placeholderTextColor={Colors.light.placeholderText}
                />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: 100,
        paddingLeft: spacing
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    }
})