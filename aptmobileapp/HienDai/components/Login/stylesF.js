import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    backgroundColor: '#f2f2f2',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  galleryBtn: {
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#f6f8fa',
  },
  cameraBtn: {
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#f6f8fa',
  },
  galleryLabel: {
    color: '#1976D2',
  },
  cameraLabel: {
    color: '#1976D2',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  passwordInput: {
    width: 240,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  changePassBtn: {
    width: 240,
    borderRadius: 16,
    backgroundColor: '#1976D2',
    marginBottom: 10,
  },
  saveBtn: {
    width: 240,
    borderRadius: 16,
    backgroundColor: '#90b4e8',
    marginTop: 10,
  },
  saveLabel: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;