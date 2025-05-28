import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    marginLeft: 16,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 0,
    minWidth: 160,
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  statusChip: {
    borderRadius: 8,
    height: 24,
    paddingHorizontal: 0,
    justifyContent: 'center',
    marginLeft: 6,
    elevation: 0,
  },
  statusChipText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardLocation: {
    color: '#888',
    fontSize: 13,
    marginBottom: 2,
  },
  cardLabel: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  cardValue: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13,
  },
  maintenanceText: {
    color: '#D32F2F',
    fontStyle: 'italic',
    marginTop: 2,
    fontSize: 13,
  },

  // Dialog styles
  dialog: {
    borderRadius: 22,
  },
  dialogTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 32,
  },
  dialogClose: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 8,
  },
  dialogBox: {
    backgroundColor: '#F5F8FD',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  dialogInfo: {
    fontSize: 15,
    marginBottom: 2,
    color: '#444',
  },
  dialogInfoLabel: {
    color: '#888',
    fontWeight: '500',
  },
  dialogInfoValue: {
    color: '#222',
    fontWeight: 'bold',
  },
  dialogStatusChip: {
    backgroundColor: '#E3F0FF',
    borderRadius: 8,
    height: 22,
    marginLeft: 4,
    elevation: 0,
    paddingHorizontal: 8,
  },
  dialogStatusChipText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dialogSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
    marginBottom: 6,
  },
  dialogUnassign: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  dialogResidentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3EAFD',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  dialogResidentAvatar: {
    backgroundColor: '#1976D2',
    marginRight: 10,
  },
  dialogResidentName: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
  },
  dialogNoResident: {
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 12,
    marginLeft: 2,
  },
  dialogLockerContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dialogAddItemBtn: {
    borderColor: '#1976D2',
    borderWidth: 1,
    borderRadius: 8,
    height: 36,
    backgroundColor: '#fff',
    elevation: 0,
    marginRight: 2,
  },
  dialogAddItemLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  dialogItemBox: {
    backgroundColor: '#F5F8FD',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dialogItemTitle: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
    marginBottom: 2,
  },
  dialogItemDesc: {
    color: '#444',
    fontSize: 14,
    marginBottom: 2,
  },
  dialogItemDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dialogItemDateIcon: {
    margin: 0,
    padding: 0,
    marginRight: -2,
  },
  dialogItemDate: {
    color: '#888',
    fontSize: 13,
    marginLeft: -2,
  },
  dialogItemDelete: {
    marginLeft: 8,
    marginTop: -4,
    backgroundColor: 'transparent',
  },
});