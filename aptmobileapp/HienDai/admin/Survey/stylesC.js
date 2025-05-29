import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
    padding: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 18,
  },
  dialogTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  dialogClose: {
    marginLeft: 8,
  },
  dialogLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 2,
  },
  dialogInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 15,
    minHeight: 40,
    marginBottom: 2,
  },
  dialogSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 18,
    marginBottom: 8,
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

export default styles;