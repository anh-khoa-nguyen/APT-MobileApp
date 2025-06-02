import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "./stylesAI";

// Style components using Tailwind CSS
import ChatHistory from "./ChatHistory";
import { ActivityIndicator } from "react-native-paper";
// import Loading from "./Components/Loading";

const Loading = ({ isLoading }) => {
  return (
    <View>
      {isLoading && (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={{ marginLeft: 8 }}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const ChatAI = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // inislize your Gemeni Api
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDLm2z59TLtXOhuy8L6L2tN6uPXJHdhxhQ"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // call Gemini Api to get a response
      const result = await model.generateContent(userInput);
      const response = await result.response;
      console.log(response);
      // add Gemeni's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatbox}>
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
        </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          style={[
            styles.sendBtn,
            isLoading && styles.sendBtnDisabled
          ]}
          onPress={sendMessage}
          disabled={isLoading}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.clearBtn} onPress={clearChat}>
        <Text style={styles.clearBtnText}>Clear Chat</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ChatAI;