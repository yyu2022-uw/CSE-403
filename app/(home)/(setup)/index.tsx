import { useAuth } from "@useAuth";
import { Redirect } from "expo-router";
import { supabase } from "lib/supabase";
import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet, Alert } from "react-native";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [isSetUp, setIsSetUp] = useState<boolean>(false);
  const id = useAuth()?.user?.id;

  async function setProfile() {
    console.log("Setting profile:", { fullName, username, bio, id });

    // Validate inputs
    if (!fullName.trim() || !username.trim() || !bio.trim()) {
      Alert.alert("Warning", "All fields must be filled.");
      // console.error("Validation Error: All fields must be filled.");
      return;
    }

    try {
      // Check if the username is already taken
      const { data: existingUser, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.trim())
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError; // Handle any unexpected errors in fetching
      }

      if (existingUser && existingUser.id !== id) {
        Alert.alert("Error", "Username already taken.");
        // console.error("Error: Username already taken.");
        return;
      }

      // Update the profile in Supabase
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          username: username.trim(),
          bio: bio.trim(),
        })
        .eq('id', id)
        .select();

      if (updateError) {
        throw updateError; // Handle any unexpected update errors
      }

      if (!updatedProfile || updatedProfile.length === 0) {
        Alert.alert("Error", "Failed to update profile. Please try again.");
        // console.error("Error: Profile update returned no data.");
        return;
      }

      console.log("Profile updated successfully:", updatedProfile);
      setIsSetUp(true);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  if (isSetUp) {
    return <Redirect href={'/(home)/(tabs)/'} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Up Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={fullName}
        onChangeText={setFullName}
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

