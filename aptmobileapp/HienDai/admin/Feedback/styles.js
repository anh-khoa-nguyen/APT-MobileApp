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
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    height: 44,
    borderRadius: 10,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 2,
  },
  tab: {
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    elevation: 0,
  },
  tabText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 15,
  },
  tabActive: {
    backgroundColor: '#1976D2',
    marginRight: 8,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    elevation: 0,
  },
  tabActiveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 25,
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
  chipNew: {
    backgroundColor: '#FFF9C4',
    marginLeft: 6,
    height: 26,
    borderRadius: 8,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  chipNewText: {
    color: '#FBC02D',
    fontWeight: 'bold',
    fontSize: 13,
  },
  chipInProgress: {
    backgroundColor: '#ECEFF1',
    marginLeft: 6,
    height: 30,
    borderRadius: 8,
    paddingHorizontal: 0,
    // justifyContent: 'center',
  },
  chipInProgressText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 13,
  },
  chipResolved: {
    backgroundColor: '#E8F5E9',
    marginLeft: 6,
    height: 26,
    borderRadius: 8,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  chipResolvedText: {
    color: '#388E3C',
    fontWeight: 'bold',
    fontSize: 13,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  priorityText: {
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: -4,
  },
  cardContent: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  cardFrom: {
    color: '#888',
    fontSize: 13,
  },
  cardFromName: {
    color: '#222',
    fontWeight: 'bold',
  },
  cardDate: {
    color: '#888',
    fontSize: 13,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  chipTag: {
    backgroundColor: '#E3EAFD',
    borderRadius: 8,
    height: 26,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  chipTagText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardReplies: {
    color: '#888',
    fontSize: 13,
  },

  // Dialog styles
  dialog: {
    borderRadius: 22,
    borderRadius: 22,
    maxHeight: '90%', // hoặc 65%, tuỳ ý
    alignSelf: 'center',
    width: '90%', // hoặc 90% nếu muốn nhỏ lại
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
  dialogInfoRow: {
    marginBottom: 8,
  },
  dialogFrom: {
    color: '#888',
    fontSize: 15,
    marginBottom: 2,
  },
  dialogFromName: {
    color: '#222',
    fontWeight: 'bold',
  },
  dialogDate: {
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
  },
  dialogContentBox: {
    backgroundColor: '#F5F8FD',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  dialogContentText: {
    color: '#444',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dialogSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
    marginBottom: 6,
  },
  dialogStatusRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  chipStatus: {
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
  },
  chipStatusText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 14,
  },
  chipStatusActive: {
    backgroundColor: '#1976D2',
    marginRight: 8,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
  },
  chipStatusActiveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dialogPriorityRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  chipPriority: {
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
  },
  chipPriorityText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 14,
  },
  chipPriorityActiveLow: {
    backgroundColor: '#E8F5E9',
    marginRight: 8,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
  },
  chipPriorityActiveMedium: {
    backgroundColor: '#FFF9C4',
    marginRight: 8,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
  },
  chipPriorityActiveHigh: {
    backgroundColor: '#FFEBEE',
    marginRight: 8,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
  },
  chipPriorityActiveText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  dialogMsgRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dialogAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    marginTop: 2,
  },
  dialogMsgBox: {
    backgroundColor: '#F5F8FD',
    borderRadius: 12,
    padding: 10,
    flex: 1,
  },
  dialogMsgName: {
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    fontSize: 14,
  },
  dialogMsgContent: {
    color: '#444',
    fontSize: 15,
    marginBottom: 2,
  },
  dialogMsgTime: {
    color: '#888',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  dialogInput: {
    marginTop: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 44,
  },
});