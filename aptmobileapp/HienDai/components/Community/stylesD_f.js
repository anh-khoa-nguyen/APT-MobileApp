import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 12,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    height: 28,
    marginLeft: 8,
  },
  submittedText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 2,
  },
  description: {
    fontSize: 16,
    color: '#222',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    backgroundColor: '#eee',
    marginTop: 4,
  },
  responseTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginBottom: 8,
  },
  responseBox: {
    backgroundColor: '#F3FAF6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  responseBoxPending: {
    backgroundColor: '#FFF8E1',
  },
  responseContent: {
    fontSize: 15,
    color: '#222',
  },
  responseDate: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
});