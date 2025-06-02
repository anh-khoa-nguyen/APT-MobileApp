import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA', // giống Home
    marginTop: 12,
  },
  contentWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  contentContainer: {
    padding: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 8,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#222',
  },
  filterButton: {
    borderRadius: 30,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 0,
    elevation: 0,
    minWidth: 55,
    height: 40,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
  },
  filterButtonLabel: {
    color: '#222',
    fontWeight: '500',
    fontSize: 15,
    textTransform: 'none',
  },
  filterButtonLabelActive: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  paymentCard: {
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  paymentCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 0,
  },
  paymentRightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 90,
    marginLeft: 12,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    marginTop: 12,
  },
  statusBadge: {
    borderRadius: 12,
    alignSelf: 'flex-end',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 2,
    letterSpacing: 0,
    overflow: 'hidden',
  },
  paidBadge: {
    backgroundColor: '#3DC47E',
    color: '#fff',
  },
  unpaidBadge: {
    backgroundColor: '#3B82F6',
    color: '#fff',
  }, advancedModalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0,0.0)', // Không che toàn màn hình
    marginTop: 100, 
  },
  advancedModalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: 260,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  }, paymentCardBg: {
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 110, // hoặc height: 110, hoặc flex: 1 nếu muốn tự động giãn
    width: '100%',
  },
});