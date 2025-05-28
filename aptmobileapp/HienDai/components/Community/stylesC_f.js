import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  contentContainer: { padding: 16 },
  desc: { color: '#555', fontSize: 16, marginBottom: 15 },
  label: { fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 8 },
  input: { backgroundColor: '#fff', marginBottom: 12 },
  inputContent: { minHeight: 100, textAlignVertical: 'top' },
  imageBtn: {
    borderColor: '#3B5BDB',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 22,
    height: 100,
    justifyContent: 'center',
  },
  imageLabel: { color: '#3B5BDB', fontWeight: 'bold', fontSize: 16 },
  submitBtn: {
    backgroundColor: '#3B5BDB',
    borderRadius: 12,
    height: 45,
    justifyContent: 'center',
  },
  submitLabel: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});