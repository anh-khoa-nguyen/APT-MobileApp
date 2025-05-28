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
  }, contentWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  tabButton: {
    flex: 1,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 0,
    elevation: 0,
  },
  tabButtonActive: {
    backgroundColor: '#e8eefc',
  },
  tabButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabButtonLabel: {
    color: '#3B5BDB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabButtonLabelActive: {
    color: '#3B5BDB',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  newFeedbackButton: {
    borderRadius: 20,
    backgroundColor: '#3B5BDB',
    elevation: 0,
    height: 40,
  },
  newFeedbackButtonLabel: {
    color: '#fff',
    // fontWeight: '500',
    fontSize: 15,
    textTransform: 'none',
    paddingHorizontal: 8,
  },
  feedbackCard: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  feedbackCardContent: {
    // paddingVertical: 10,
    // paddingHorizontal: 0,
  },
  feedbackCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  feedbackDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 0,
  },
  statusBadge: {
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 2,
    alignSelf: 'flex-end',
    overflow: 'hidden',
    height: 24,
  },surveyFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  surveyActionButton: {
    marginLeft: 8,
    minHeight: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  surveyActionButtonLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3B5BDB',
    textTransform: 'none',
    paddingHorizontal: 0,
  },
});