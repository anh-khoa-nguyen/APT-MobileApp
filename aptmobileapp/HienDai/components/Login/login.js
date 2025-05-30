import {View, Text, TouchableOpacity, ScrollView
    , KeyboardAvoidingView, Platform, ImageBackground, StatusBar, ActivityIndicator,} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";


import styles from "./style";
import myStyles from "../../Styles/MyStyles";

import React, { useContext, useState } from "react";
import APIs, { authAPI, endpoints } from "../../configs/Apis";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext } from "../../configs/Contexts";
import { useNavigation } from "@react-navigation/native";

//Trang khác:
import HomeScreen from "../Home/Home";
// import Apis from "../../configs/Apis";
// import ProfileScreen from "../Profile/Profile";
// import { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } from ".env";

// console.log("REACT_APP_CLIENT_ID: ", REACT_APP_CLIENT_ID);
// console.log("REACT_APP_CLIENT_SECRET: ", REACT_APP_CLIENT_SECRET);
const LoginScreen = ({ navigation }) => {
    const input = [{
        label: 'Tên đăng nhập',
        field: 'username',
        icon: 'account',
        secureTextEntry: false
    }, {
        label: 'Mật khẩu',
        field: 'password',
        icon: 'eye',
        secureTextEntry: true
    }];

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();
    const [errMsg, setErrMsg] = useState();
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useContext(MyDispatchContext);

    
    const setState = (value, field) => {
        setUser({...user, [field]: value})
    }

    const updateState = (value) => {
        setUsername(value);
    };

    
    const validate = () => {
        if (Object.values(user).length == 0) {
            setErrMsg("Vui lòng nhập thông tin!");
            return false;
        }

        for (let i of input)
            if (user[i.field] === '') {
                setErrMsg(`Vui lòng nhập ${i.label}!`);
                return false;
            }

        console.log(errMsg)
        setErrMsg('');
        return true;
    }


    // const login = async () => {


    //     if (validate() === true) {
        
    //         setLoading(true);
    //         // setErrMsg(false);

    //         const payload = {
    //             username,
    //             password,
    //             client_id: REACT_APP_CLIENT_ID,
    //             client_secret: REACT_APP_CLIENT_SECRET,
    //             // client_id: process.env.REACT_APP_CLIENT_ID,
    //             // client_secret: process.env.REACT_APP_CLIENT_SECRET,
    //             grant_type: "password",
    //         };


    //         console.log(
    //             "REACT_APP_CLIENT_ID: ",
    //             REACT_APP_CLIENT_ID,
    //             "REACT_APP_CLIENT_SECRET: ",
    //             REACT_APP_CLIENT_SECRET,
    //             username,
    //             password,
    //         );

    //         let esc = encodeURIComponent;
    //         let query = Object.keys(payload)
    //             .map((k) => esc(k) + "=" + esc(payload[k]))
    //             .join("&");
    //         console.log("Query gửi đi: ", query); // Kiểm tra chuỗi đã mã hóa


    //         try {
    //             // let res = await APIs({
    //             //     method: "post",
    //             //     url: endpoints.login,
    //             //     withCredentials: true,
    //             //     crossdomain: true,
    //             //     data: query,
    //             // });

    //             console.log("Phản hồi từ API: ", res.data); // Kiểm tra phản hồi trả về

    //             await AsyncStorage.setItem("access_token", res.data.access_token);

    //             setTimeout(async () => {
    //                 let token = await AsyncStorage.getItem("access_token");
    //                 print(token)
    //                 let user = await authAPI(token).get(endpoints["getUser"]);
    //                 await AsyncStorage.setItem("user", JSON.stringify(user.data));
    //                 dispatcher({
    //                     type: "login",
    //                     payload: { ...user.data, token },
    //                 });
    //                 if (user.data.change_password_required === true) {
    //                     nav.navigate(HomeScreen);
    //                 } else {
    //                     nav.navigate("ChangInfo", {
    //                         user: user.data,
    //                         token: token,
    //                     });
    //                 }
    //             }, 100);
    //         } catch (error) {
    //             setErrMsg(true);
    //             console.error("Lỗi đăng nhập: ", error.response ? error.response.data : error.message);
    //             if (error.response) {
    //                 console.log("Response Status: ", error.response.status);
    //                 console.log("Response Headers: ", error.response.headers);
    //                 console.log("Response Data: ", error.response.data); // In ra chi tiết dữ liệu lỗi
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
            
    //     }
        
    // };

    const login = async () => {
        if (validate() === true) {
            setLoading(true);

            const payload = {
            username: user.username,
            password: user.password,
            // client_id: process.env.REACT_APP_CLIENT_ID,
            // client_secret: process.env.REACT_APP_CLIENT_SECRET,
            client_id: "SXN96WOCYXtEVD1f8PyQVDmm0VNn7zEFLbQEJ866",
            client_secret: "pGcBpfCnFtMJSLEVOLBB90AiUbl3aFB1yBUJdyvGZPXJ50Umm2yaSNThXDO8jxZ2lK4ZNq3JX7U2loISX9C6Regnk9A6JHeiQ80ynlP21lugKssJ9FXu9hoK3aBFEYxq",
            grant_type: "password"
            };

            // Chuyển object thành query string
            const formBody = Object.entries(payload)
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');

            try {
            const res = await APIs.post(endpoints['login'], formBody, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            await AsyncStorage.setItem('token', res.data.access_token);

            let u = await authAPI(res.data.access_token).get(endpoints['current_user']);

            dispatch({
                "type": "login",
                "payload": u.data
            });

            console.log(MyDispatchContext)

            // setTimeout(async () => {
            //     nav.navigate('ProfileScreen')
            // }, 100);

            } catch (ex) {
            console.error('Login failed:', ex.response?.data || ex.message);
            } finally {
            setLoading(false);
            }
        }
    };

    return (
        <View style={myStyles.container}>
            <HelperText type="error" visible={errMsg}>{errMsg}</HelperText>

            <StatusBar barStyle={"light-content"} />
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                    
                    <View style={styles.top}>
                        <Text style={styles.TextTop}>Đăng nhập</Text>
                    </View>

                    <View style={styles.top2}>
                        <Text style={styles.TextTop2}>Chào bạn đến với chung cư</Text>
                        <Text style={styles.TextTop2}>K&K</Text>
                    </View>

                    <View style={styles.inputfather}>
                        {/* {errMsg && (
                            <Text style={[styles.TextTop3, { color: "red" }]}>
                                Bạn nhập sai tên đăng nhập hoặc mật khẩu, hãy
                                thử lại!!!!
                            </Text>
                        )} */}

                        {input.map(i => (
                        <TextInput
                            key={i.field}
                            style={myStyles.m}
                            label={i.label}
                            secureTextEntry={i.secureTextEntry}
                            value={user[i.field]}
                            onChangeText={t => setState(t, i.field)}
                            right={<TextInput.Icon icon={i.icon} onPress={i.onIconPress} />}
                        />
                        ))}

                        <TouchableOpacity onPress={() => { navigation.navigate("ForgotAccount"); }}>
                            <Text style={styles.ForgotPass}>
                                Quên mật khẩu?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[
                            styles.btnLoginfather,
                            isPressed && styles.btnLoginfatherPressed,
                        ]}
                    ></View>
                    <View style={styles.btnLoginChildP}>
                        <Button
                            onPress={login}
                            loading={loading}
                            disabled={loading}
                            icon={"account"}
                            style={[
                                styles.btnLoginChild,
                                isPressed && styles.btnLoginfatherPressed,
                            ]}
                            labelStyle={{ color: '#fff', fontWeight: '600' }}
                            
                        >
                            Đăng nhập
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        </View>
    );
};
export default LoginScreen;
