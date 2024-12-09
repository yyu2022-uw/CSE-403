import { useAuth } from "@useAuth";
import { Redirect, useRouter } from "expo-router";
import { supabase } from "lib/supabase";
import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet, Alert } from "react-native";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const id = useAuth()?.user?.id;
  const router = useRouter();

  async function setProfile() {
    // Validate inputs
    if (!username?.trim()) {
      Alert.alert('Invalid Input', 'Username cannot be empty.')
      return;
    }
    
    if (!fullname?.trim()) {
      Alert.alert('Invalid Input', 'Full name cannot be empty.')
      return;
    }

    if (!bio?.trim()) {
      setBio("Hello!")
    }

    try {
      // Update the profile in Supabase
      await supabase
        .from('profiles')
        .update({ full_name: fullname.trim(), bio: bio.trim(), username: username.trim() })
        .eq('id', id);

      router.navigate("/(home)")

    } catch (err) {
      console.error("Error updating profile:", err);
    }

    // Connect to Stream (need to be implemented)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={fullname}
        onChangeText={setFullname}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter your bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Button title="Submit" onPress={setProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  interest: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedInterest: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  interestText: {
    color: "#000",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

