import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { spacing } from '@Spacing'
import { sizes } from '@Sizes'

interface BioProps {
    text: string,
}

export default function Bio({ text }: BioProps) {
    return (
        <View style={styles.container}>
            <Text style={sizes.plainText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: 100,
        paddingLeft: spacing
    }
})