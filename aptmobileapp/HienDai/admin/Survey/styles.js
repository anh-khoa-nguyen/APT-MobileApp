import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  createBtn: {
    borderRadius: 8,
    height: 40,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    paddingHorizontal: 4,
    elevation: 0,
  }, summaryBtn: {
    borderRadius: 8,
    height: 40,
    backgroundColor: '#1C8C1C',
    justifyContent: 'center',
    // paddingHorizontal: 8,
    marginLeft: 8,
    elevation: 0,
  }, 
  createBtnLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    // marginLeft: 2,
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
    borderRadius: 18,
    marginBottom: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  statusChip: {
    borderRadius: 8,
    height: 28,
    paddingHorizontal: 0,
    justifyContent: 'center',
    marginLeft: 8,
    elevation: 0,
  },
  statusChipText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardDesc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
    marginTop: 2,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
    flexWrap: 'wrap',
  },
  cardInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    margin: 0,
    padding: 0,
    marginRight: -2,
  },
  cardInfoText: {
    color: '#888',
    fontSize: 14,
    marginLeft: -2,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  completeBtn: {
    borderColor: '#1976D2',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    height: 36,
    justifyContent: 'center',
    minWidth: 110,
    backgroundColor: '#fff',
    elevation: 0,
  },
  completeBtnLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  deleteBtn: {
    height: 36,
    justifyContent: 'center',
    elevation: 0,
    backgroundColor: '#fff',
  },
  deleteBtnLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15,
  }, dialog: {
    backgroundColor: '#F7F9FB',
    borderRadius: 24,

  },
  dialogTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 0,
    marginTop: 8,
  },
  dialogClose: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 8,
    zIndex: 2,
  },
  dialogSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginTop: 0,
  },
  dialogBox: {
    backgroundColor: '#F2F6FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    marginTop: 0,
  },
  dialogSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  dialogLabel: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    marginBottom: 2,
    fontWeight: '500',
  },
  dialogInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 4,
    fontSize: 15,
    minHeight: 40,
  },
  qTypeRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
  qTypeBtn: {
    borderRadius: 8,
    marginRight: 8,
    minWidth: 110,
    height: 36,
    justifyContent: 'center',
  },
  qTypeBtnActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#1976D2',
    borderWidth: 1,
  },
  qTypeBtnInactive: {
    backgroundColor: '#fff',
    borderColor: '#B0B0B0',
    borderWidth: 1,
  },
  qTypeBtnLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  qTypeBtnLabelActive: {
    color: '#1976D2',
  },
  qTypeBtnLabelInactive: {
    color: '#444',
  },
  requiredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  requiredCheckbox: {
    marginRight: 4,
    marginLeft: -8,
  },
  requiredLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  addOptionBtn: {
    marginLeft: 8,
    backgroundColor: 'transparent',
    elevation: 0,
    minWidth: 0,
    paddingHorizontal: 0,
  },
  addOptionLabel: {
    color: '#1976D2',
    fontWeight: '600',
    fontSize: 15,
  },
  addQuestionBtn: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#1976D2',
    minHeight: 44,
    justifyContent: 'center',
  },
  addQuestionLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  dialogActions: {
    paddingHorizontal: 24,
    paddingBottom: 18,
    paddingTop: 8,
    backgroundColor: '#F7F9FB',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'flex-end',
  },
  dialogBtn: {
    borderRadius: 8,
    borderColor: '#1976D2',
    borderWidth: 1,
    marginRight: 12,
    minWidth: 110,
    backgroundColor: '#fff',
  },
  dialogBtnLabel: {
    color: '#1976D2',
    fontWeight: '700',
    fontSize: 16,
  },
  dialogBtnPrimary: {
    borderRadius: 8,
    backgroundColor: '#1976D2',
    minWidth: 110,
  },
  dialogBtnPrimaryLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});