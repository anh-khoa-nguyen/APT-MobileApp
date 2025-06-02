import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    marginTop: 12,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    // marginBottom: 18,
  },
  lockerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  lockerId: {
    fontSize: 15,
    color: '#888',
    marginBottom: 8,
  },
  packageCard: {
    borderRadius: 18,
    backgroundColor: '#fff',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  packageCardContent: {
    
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  packageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  packageDescription: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
    marginTop: 2,
  },
  packageImage: {
    width: '100%',
    height: 170,
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  packageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  packageDate: {
    fontSize: 14,
    color: '#888',
  },
  statusBadge: {
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    height: 24,
  },
  pendingBadge: {
    backgroundColor: '#FFD966',
    color: '#fff',
  },
  receivedBadge: {
    backgroundColor: '#3DC47E',
    color: '#fff',
  },
  markButton: {
    backgroundColor: '#F3FAF6',
    borderRadius: 20,
    elevation: 0,
    marginLeft: 8,
    height: 36,
    justifyContent: 'center',
  },
  markButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 36,
  },
  markButtonLabel: {
    color: '#3DC47E',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'none',
  },contentWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  }, memberList: {
  marginVertical: 12,
},
});