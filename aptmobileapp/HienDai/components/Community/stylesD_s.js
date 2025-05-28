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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  desc: {
    color: '#444',
    fontSize: 15,
    marginBottom: 8,
  },
  available: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  questionIndex: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#3B5BDB',
  },
  question: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginBottom: 12,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: '#BFC9DA',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  optionBtnSelected: {
    backgroundColor: '#E7EEF9',
    borderColor: '#3B5BDB',
  },
  optionText: {
    color: '#3B5BDB',
    fontSize: 17,
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: '#3B5BDB',
  },
  submitBtn: {
    backgroundColor: '#3B5BDB',
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
    height: 48,
    justifyContent: 'center',
  },
  submitLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'none',
  }, optionRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 6,
  paddingVertical: 4,
  borderRadius: 8,
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3B5BDB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  optionRadioChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B5BDB',
  },
  optionLabel: {
    fontWeight: 'bold',
    marginRight: 6,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardSurvey: {
    marginBottom: 16,
    borderRadius: 10,
  },
});