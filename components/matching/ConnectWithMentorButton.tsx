import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@Colors';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons

let buttonColor = Colors.light.button_purple;
let buttonTextColor = Colors.light.buttonText_purple;

type ConnectWithMentorButtonProps = {
  onClick: () => void;
};

const ConnectWithMentorButton: React.FC<ConnectWithMentorButtonProps> = ({ onClick }) => {

  const buttonColor = Colors.light.button_purple;
  const buttonTextColor = Colors.light.buttonText_purple
  const buttonText = 'Connect With Match'
  const buttonIcon = 'person-add';

  return (
    <Pressable
      onPress={() => {
        onClick();
      }}
      style={[styles.container, { backgroundColor: buttonColor }]}>
      <View style={styles.textContainer}>
        <Ionicons name={buttonIcon} size={24} color={buttonTextColor} style={styles.icon} />
        <Text style={[sizes.largePillText, { color: buttonTextColor }]}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

export default ConnectWithMentorButton;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 48,
    borderRadius: 50,
    marginBottom: spacing,
    margin: "auto",
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    paddingRight: 8,
    fontSize: 30,
  },
});
