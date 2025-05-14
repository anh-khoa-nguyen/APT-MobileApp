import { StyleSheet } from "react-native";
import Colors from "../../Styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.background,
    },
    top: {
        marginTop: 20,
        alignItems: "center",
    },
    TextTop: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
    },
    top2: {
        fontSize: 16,
        color: Colors.textLight,
        alignItems: "center",
        marginBottom: 16,
    },
    TextTop2: {

        fontSize: 18,
        color: Colors.textLight,
    },
    TextTop3: {
        fontSize: 14,
        color: Colors.error,
        textAlign: "center",
        marginBottom: 10,
    },
    inputfather: {
        marginTop: 16,
        paddingHorizontal: 16,

    },
    input: {
        marginBottom: 16,
        backgroundColor: Colors.card,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 8,
    },
    ForgotPass: {
        color: Colors.primary,
        textAlign: "right",
        marginTop: 8,
        fontWeight: "500",
    },
    btnLoginfather: {
        marginTop: 20,
        alignItems: "center",
    },
    btnLoginfatherPressed: {
        opacity: 0.8,
    },
    btnLoginChildP: {
        marginTop: 12,
        alignItems: "center",
    },
    btnLoginChild: {
        marginTop: 16,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 10,
    },
});

export default styles;
