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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    // height: 44,
  },
  addBtn: {
    borderRadius: 6,
    height: 44,
    justifyContent: 'center',
    backgroundColor: '#1976D2',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 14,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
    color: '#388E3C',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  icon: {
    marginRight: 6,
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    color: '#444',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    alignItems: 'center',
  },
  actionBtn: {
    // flex: 1,
    justifyContent: 'center',
    borderColor: '#1976D2',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 6,
    height: 38,
    justifyContent: 'center',
  },
  actionLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  deactivateBtn: {
    height: 38,
    justifyContent: 'center',
  },
  deactivateLabel: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  // Dialog styles
  dialog: {
    borderRadius: 22,
    maxHeight: '60%', // hoặc 65%, tuỳ ý
    alignSelf: 'center',
    width: '90%', // hoặc 90% nếu muốn nhỏ lại
  },
  dialogClose: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 8,
  },
  dialogInfoBox: {
    backgroundColor: '#F5F8FD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  dialogHighlight: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  dialogLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 4,
    color: '#222',
  },
  dialogInput: {
    width: 80,
    alignSelf: 'flex-start',
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  dialogActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  dialogBtn: {
    borderColor: '#1976D2',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 110,
  },
  dialogBtnLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dialogBtnPrimary: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    minWidth: 110,
  },
  dialogBtnPrimaryLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }, // ...existing code...
  aptBtn: {
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 22,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  aptBtnSelected: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  aptBtnLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aptBtnLabelSelected: {
    color: '#fff',
  },

});