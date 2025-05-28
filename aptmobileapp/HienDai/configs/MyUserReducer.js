import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyUserReducer = (current, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            AsyncStorage.removeItem("token");
            return null;
        default:
            return current;
    }
};