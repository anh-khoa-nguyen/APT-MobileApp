import "dotenv/config";

export default {
    expo: {
        name: "HienDai",
        slug: "HienDai",
        version: "1.0.0",
        orientation: "portrait",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            apiKey: 'AIzaSyCjGf8g8XMm-t1R9dlpndqil5AJh3HCIH8',
            authDomain: 'chatapp-7092c.firebaseapp.com',
            projectId: 'chatapp-7092c',
            storageBucket: 'chatapp-7092c.firebasestorage.app',
            messagingSenderId: '368316514401',
            appId: '1:368316514401:web:ec5a85ccaaa7ec16deaa20',
        },
        
    },
};
