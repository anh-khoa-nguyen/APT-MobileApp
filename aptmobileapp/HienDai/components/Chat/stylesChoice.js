import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#eafdff",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    minWidth: 320,
    alignItems: "center",
    elevation: 8,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#222",
    textAlign: "center",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  optionBox: {
    width: 120,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginBottom: 8,
    elevation: 2,
    position: "relative",
  },
  optionBoxSelected: {
    borderColor: "#2563eb",
    // elevation: 6,
  },
  optionContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",

  },
  optionIcon: {
    width: 56,
    height: 56,
    marginBottom: 12,
    resizeMode: "contain",
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  optionLabelSelected: {
    color: "#2563eb",


  },
  checkIcon: {
    position: "absolute",
    bottom: -16,
    alignSelf: "center",
    backgroundColor: "#2563eb",
    elevation: 4,
  },
});