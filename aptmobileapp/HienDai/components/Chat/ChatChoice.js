import React, { useState } from "react";
import { View, Image, ImageBackground } from "react-native";
import { Text, TouchableRipple, Avatar, IconButton } from "react-native-paper";
import { styles } from "./stylesChoice";

const options = [
  {
    key: "realtime",
    label: "Chat Realtime",
    icon: { uri: "https://cdn-icons-png.flaticon.com/256/1006/1006642.png" }, // Đổi thành đường dẫn icon của bạn
  },
  {
    key: "ai",
    label: "Chat AI",
    icon: { uri: "https://static.vecteezy.com/system/resources/previews/007/225/199/non_2x/robot-chat-bot-concept-illustration-vector.jpg" }, // Đổi thành đường dẫn icon của bạn
  },
];

const bgUrl = { uri: "https://img.freepik.com/premium-vector/dialogue-balloon-chat-bubble-icons-seamless-pattern-textile-pattern-wrapping-paper-linear-vector-print-fabric-seamless-background-wallpaper-backdrop-with-speak-bubbles-chat-message-frame_8071-58894.jpg?semt=ais_hybrid&w=740" };

const ChatChoice = ({ navigation }) => {
  const [selected, setSelected] = useState("realtime");

  const handlePress = (key) => {
    setSelected(key);
    setTimeout(() => {
      if (key === "realtime") navigation.navigate("Chat");
      if (key === "ai") navigation.navigate("ChatAI");
    }, 200);
  };

  return (
    <ImageBackground source={bgUrl} style={styles.bg} resizeMode="cover" blurRadius={6} >
      <View style={styles.modal}>
        <IconButton
          icon="close"
          size={24}
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Choose Option</Text>
        <View style={styles.optionsRow}>
          {options.map((opt) => (
            <TouchableRipple
              key={opt.key}
              style={[
                styles.optionBox,
                selected === opt.key && styles.optionBoxSelected,
              ]}
              onPress={() => handlePress(opt.key)}
              rippleColor="#2563eb20"
              borderless={true}
            >
              <View style={styles.optionContent}>
                <Image source={opt.icon} style={styles.optionIcon} />
                <Text
                  style={[
                    styles.optionLabel,
                    selected === opt.key && styles.optionLabelSelected,
                  ]}
                >
                  {opt.label}
                </Text>
                {selected === opt.key && (
                  <Avatar.Icon
                    icon="check"
                    size={32}
                    style={styles.checkIcon}
                    color="#fff"
                  />
                )}
              </View>
            </TouchableRipple>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default ChatChoice;