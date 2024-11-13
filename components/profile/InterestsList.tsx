import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { interests, Interest } from '@/data/interests';
import { Colors } from '@Colors';
import { sizes } from '@Sizes';

type InterestListProps = {
    interests: Interest[] | null | undefined
    is_mentor: boolean;
}

const InterestsList = ({ interests, is_mentor }: InterestListProps) => {
    return (
        <View style={styles.container}>
            {/* {[
                { id: 1, name: "Guitar", color: 'mistyrose', icon: '🎸' },
                { id: 2, name: "Programming", color: 'whitesmoke', icon: '🧑‍💻' },
                { id: 3, name: "Traveling", color: 'azure', icon: '✈️' },
                { id: 4, name: "Reading", color: 'oldlace', icon: '📚' },
                { id: 5, name: "Cooking", color: 'floralwhite', icon: '🥘' }
            ] */}

            {
                interests?.map((item: Interest) => (
                    <View key={item.id} style={[styles.item, { backgroundColor: item.color }]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[sizes.smallPillText, { paddingRight: 6 }]}>{item.icon}</Text>
                            <Text style={sizes.smallPillText}>{item.name}</Text>
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
