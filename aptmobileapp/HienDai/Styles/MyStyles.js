import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        // backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
    },
    subject: {
        fontSize: 25,
        fontWeight: "bold",
        color: "blue",
    },
    wrap: {
        backgroundColor: '#fff',
        borderRadius: 7,
        shadowColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    }
});

export const tagsStyles = {
    p: { marginBottom: 8, fontSize: 16, color: '#222' },
    strong: { fontWeight: 'bold', color: '#222' },
    b: { fontWeight: 'bold', color: '#222' },
    em: { fontStyle: 'italic' },
    i: { fontStyle: 'italic' },
    u: { textDecorationLine: 'underline' },
    mark: { backgroundColor: '#ffe066', color: '#222' },
    code: { fontFamily: 'monospace', backgroundColor: '#eee', padding: 2, borderRadius: 4 },
    small: { fontSize: 12, color: '#888' },
    del: { textDecorationLine: 'line-through' },
    ins: { textDecorationLine: 'underline', color: '#3DC47E' },
    span: { color: '#222' },
    a: { color: '#1976d2', textDecorationLine: 'underline' },
};
