import React from "react";
import { View, Text } from "react-native";
import { styles } from "./stylesAI";

const ChatHistory = ({ chatHistory }) => {
  return (
    <View>
      {chatHistory.map((message, index) => (
        <View
          key={index}
          style={[
            styles.messageBubble,
            message.type === "user"
              ? styles.userBubble
              : styles.botBubble,
          ]}
        >
          {message.type === "user" && (
            <Text style={styles.userLabel}>You:</Text>
          )}
          <Text style={styles.messageText}>{message.message}</Text>
        </View>
      ))}
    </View>
  );
};

export default ChatHistory;