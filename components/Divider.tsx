import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DividerProps {
    margin: number;
}

const Divider = ({ margin }: DividerProps) => {
    return <View style={[styles.divider, { marginVertical: margin }]} />;
};

const styles = StyleSheet.create({
    divider: {
        width: "90%",
        height: 1,
        backgroundColor: '#ccc',
        alignSelf: "center"
    },
});

export default Divider;
