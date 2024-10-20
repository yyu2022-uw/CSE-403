import React from 'react';
import { padding } from '@Spacing'
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { interests, Interest } from '@/data/interests';
import { Colors } from '@Colors';
import { sizes } from '@Sizes';

const InterestsList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={interests}
                keyExtractor={(item: Interest) => item.id.toString()}
                renderItem={({ item }: { item: Interest }) => (
                    <View style={styles.item}>
                        <Text style={sizes.pillText}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: padding,
        marginVertical: 8,
        backgroundColor: Colors.light.tint,
    }
});

export default InterestsList;
