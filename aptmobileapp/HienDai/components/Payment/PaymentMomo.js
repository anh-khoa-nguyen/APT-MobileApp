import React, { useEffect } from 'react';
import { Linking, View, ActivityIndicator, Text, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, endpoints } from '../../configs/Apis';

export default function PaymentMomo({ route, navigation }) {
    const { paymentId } = route.params;

    useEffect(() => {
        const createPayment = async () => {
            const token = await AsyncStorage.getItem("token");
            try {
                const res = await authAPI(token).post(
                    endpoints.create_momo_payment,
                    {
                        payment_id: paymentId,
                        extra_data: "APP_MOBILE"
                    }
                );

                console.log("Kết quả MoMo:", res.data);
                const payUrl = res.data.payUrl;
                console.log("Đường dẫn thanh toán MoMo:", payUrl);
                if (payUrl) {
                    Linking.openURL(payUrl);
                } else {
                    alert("Không lấy được đường dẫn thanh toán");
                    navigation.goBack();
                }
            } catch (err) {
                console.error("Lỗi tạo thanh toán MoMo:", err);
                alert("Tạo thanh toán thất bại!");
                navigation.goBack();
            }
            finally {

            }
        };

        createPayment();

        // Khi app quay lại foreground, chuyển về PaymentDetails
        const subscription = AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                navigation.navigate('Home');
            }
        });
        return () => {
            subscription.remove && subscription.remove();
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <ActivityIndicator size="large" color="#3DC47E" />
            <Text style={{ marginTop: 16, color: '#3DC47E', fontWeight: 'bold' }}>
                Đang chuyển hướng đến MoMo để thanh toán...
            </Text>
        </View>
    );
}