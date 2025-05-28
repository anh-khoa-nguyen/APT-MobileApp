// style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  role: {
    marginTop: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FEE',
    borderRadius: 10,
    marginTop: 10,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#999',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }, chooseImg: {
      backgroundColor: "#e6e0ec",
      fontSize: 10,
      alignSelf: "center",
      // padding: 10,
      borderRadius: 30,
      // width: 60,   
      textAlign: "center",
      position: 'absolute',
      top: -5,
      right: -5,
  }
});

export default styles;
