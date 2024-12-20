import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { router, useRouter } from 'expo-router'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                    <Input
                        label="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="email@address.com"
                        autoCapitalize={'none'}
                    />
                </View>
                <View style={styles.verticallySpaced}>
                    <Input
                        label="Password"
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize={'none'}
                    />
                </View>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                    <Button title="Sign in" disabled={loading} onPress={() => {
                        // router.push('/(start)/(get-started)/start-page'); // Navigate to the login page testing
                        signInWithEmail()
                    }} color={'#f1e2cc'} titleStyle={{ color: '#847251' }} buttonStyle={{ borderRadius: 25 }} />
                </View>
                <View style={styles.verticallySpaced}>
                    <Button title="Sign Up" disabled={loading} onPress={() => signUpWithEmail()} color={'#f1e2cc'} titleStyle={{ color: '#847251' }} buttonStyle={{ borderRadius: 25 }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff6ea',
        justifyContent: 'center',
        padding: 24,
    },
    content: {
        marginBottom: 120
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})