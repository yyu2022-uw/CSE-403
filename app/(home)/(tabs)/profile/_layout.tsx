import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { supabase } from 'lib/supabase';
import { router, Slot, useFocusEffect } from 'expo-router';
import { useAuth } from '@useAuth';

export default function Profile() {
    const id = useAuth()?.session?.user.id;
    const [user, setUser] = useState<{
        id: string;
        username: string;
        full_name: string;
        avatar_url: string;
        bio: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {

            const fetchUser = async () => {
                try {
                    const { data: user, error } = await supabase
                        .from('profiles')
                        .select('id, username, full_name, avatar_url, bio')
                        .eq('id', id)
                        .single();

                    if (error) throw error;
                    setUser(user);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    setLoading(false);
                }
            };

            fetchUser();

        }, [id])
    );

    useEffect(() => {
        if (user) {
            router.push(
                `/(home)/(tabs)/profile/detail/profile?id=${user.id}&username=${user.username}&full_name=${user.full_name}&avatar_url=${user.avatar_url}&bio=${user.bio}`
            );
        }
    }, [user]);

    return (
        <Slot />
    )
}