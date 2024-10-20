import React from 'react';
import { padding } from '@Spacing'
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { interests, Interest } from '@/data/interests';
import { Colors } from '@Colors';
import { sizes } from '@Sizes';

const InterestsList = () => {
    return (
        <View style={styles.container}>
            {interests.map((item: Interest) => (
                <View key={item.id} style={[styles.item, { backgroundColor: item.color }]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[sizes.pillText, { paddingRight: 6 }]}>{item.icon}</Text>
                        <Text style={sizes.pillText}>{item.name}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
    },
    item: {
        paddingLeft: 12,
        padding: 10,
        marginVertical: 4,
        backgroundColor: Colors.light.tint,
        borderRadius: 50, // pill shape
    }
});

export default InterestsList;
