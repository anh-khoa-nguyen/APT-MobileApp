import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 18,
    color: '#222',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#e0e0e0',
  },
  galleryBtn: {
    alignSelf: 'center',
    marginBottom: 18,
    borderRadius: 8,
  },
  galleryLabel: {
    fontSize: 15,
  },
  input: {
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  saveBtn: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 6,
    backgroundColor: '#4977bc',
  },
  saveLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});