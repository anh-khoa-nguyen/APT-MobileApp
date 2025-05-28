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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#888',
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 16,
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginLeft: 8,
    marginTop: 2,
    color: '#fff',
  },
  amountBox: {
    backgroundColor: '#F3F6F9',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  amountLabel: {
    color: '#888',
    fontSize: 16,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailLabel: {
    color: '#888',
    fontSize: 14,
  },
  detailValue: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bankBox: {
    backgroundColor: '#F3F6F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  uploadBtn: {
    borderColor: '#3B5BDB',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 18,
    height: 44,
    justifyContent: 'center',
  },
  uploadBtnLabel: {
    color: '#3B5BDB',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'none',
  },
  momoBtn: {
    backgroundColor: '#B8005C',
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
    height: 44,
    justifyContent: 'center',
  },
  zaloBtn: {
    backgroundColor: '#1976D2',
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
    height: 44,
    justifyContent: 'center',
  },
  payBtnLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'none',
  },
  receiptImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    backgroundColor: '#eee',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginBottom: 8,
  },
});