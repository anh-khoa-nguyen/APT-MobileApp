import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B5BDB',
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    marginTop: 8,
    color: '#222',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioLabel: {
    marginRight: 24,
    fontSize: 15,
  },
  submitBtn: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#3B5BDB',
    paddingVertical: 6,
  }, memberList: {
  marginVertical: 12,
},
memberRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 8,
  borderRadius: 12,
  backgroundColor: '#fff',
  marginBottom: 8,
  elevation: 1,
},
memberRowSelected: {
  backgroundColor: '#e6f7ff',
},
memberAvatar: {
  marginRight: 12,
  backgroundColor: '#eee',
},
memberName: {
  fontSize: 16,
  fontWeight: '500',
  color: '#222',
},
});