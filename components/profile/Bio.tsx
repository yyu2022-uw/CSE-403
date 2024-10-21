import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { spacing } from '@Spacing'
import { sizes } from '@Sizes'

interface BioProps {
    editing: boolean;
    text: string;
}

export default function Bio({ editing, text }: BioProps) {
    const [editableText, setEditableText] = useState(text);

    if (!editing) {
        return (
            <View style={styles.container}>
                <Text style={sizes.plainText}>{text}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[sizes.plainText, styles.input]}
                    value={editableText}
                    onChangeText={setEditableText}
                    placeholder="Edit Name"
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