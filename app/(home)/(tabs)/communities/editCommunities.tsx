import { Interest } from '@/data/interests';
import { useAuth } from '@useAuth';
import { supabase } from 'lib/supabase';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

interface UserInterest extends Interest {
    is_mentor: boolean;
    joined: boolean;
}

const EditCommunities: React.FC = () => {
    const auth = useAuth();

    const [interests, setInterests] = useState<UserInterest[] | null | undefined>(
        auth?.interests?.map((interest) => ({
            ...interest,
            is_mentor: false,
            joined: false,
        }))
    );

    const [mentorInterests, setMentorInterests] = useState<Interest[] | null | undefined>(
        auth?.mentorInterests
    );

    const [menteeInterests, setMenteeInterests] = useState<Interest[] | null | undefined>(
        auth?.menteeInterests
    );

    // Update interests in database
    useEffect(() => {
        const updateUserInterests = async ({
            interests
        }: {
            interests: UserInterest[] | null | undefined;
        }) => {
            if (!auth?.session?.user?.id) {
                console.error("User ID is undefined. Cannot update profile.");
                return;
            }

            const { data, error } = await supabase
                .from('user_interests')
                .insert(
                    interests?.map((interest) => ({
                        uid: auth?.user?.id,
                        iid: interest.id,
                    }))
                )
                .select();

            if (error) console.error(error);
            else console.log("Profile updated successfully:", data);
        };

        updateUserInterests({ interests });
    }, [interests]); // Only runs when `interests` change

    const handleStatusChange = (id: number, status: 'Mentor' | 'Mentee' | 'Not Joined') => {
        setInterests((prevInterests) =>
            prevInterests?.map((interest) =>
                interest.id === id
                    ? {
                        ...interest,
                        is_mentor: status === 'Mentor',
                        joined: status !== 'Not Joined',
                    }
                    : interest
            )
        );
    };

    const renderInterest = ({ item }: { item: UserInterest }) => (
        <View style={[styles.interestContainer, { backgroundColor: item.color }]}>
            <Text style={styles.interestText}>{item.icon} {item.name}</Text>
            <View style={styles.statusButtons}>
                {['Mentor', 'Mentee', 'Not Joined'].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={[
                            styles.statusButton,
                            (item.is_mentor && status === 'Mentor') ||
                                (!item.is_mentor && item.joined && status === 'Mentee')
                                ? styles.selectedButton
                                : {},
                        ]}
                        onPress={() => handleStatusChange(item.id, status as 'Mentor' | 'Mentee' | 'Not Joined')}
                    >
                        <Text
                            style={[
                                styles.statusButtonText,
                                (item.is_mentor && status === 'Mentor') ||
                                    (!item.is_mentor && item.joined && status === 'Mentee')
                                    ? { color: '#fff' }
                                    : {},
                            ]}
                        >
                            {status === 'Not Joined' && (item.is_mentor || item.joined) ? 'X' : status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={interests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderInterest}
            />
        </View>
    );
};

export default EditCommunities;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    interestContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    interestText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statusButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    selectedButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    statusButtonText: {
        fontWeight: 'bold',
    },
});
