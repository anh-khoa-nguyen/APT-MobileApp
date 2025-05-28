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
    padding: 16,
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
    height: 26,
    paddingHorizontal: 0,
    justifyContent: 'center',
    marginLeft: 6,
    elevation: 0,
  },
  statusChipText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  icon: {
    margin: 0,
    padding: 0,
    marginRight: -2,
  },
  cardInfo: {
    color: '#444',
    fontSize: 15,
    marginLeft: -2,
  },
  colorChipWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  colorChip: {
    borderRadius: 8,
    height: 26,
    paddingHorizontal: 10,
    justifyContent: 'center',
    elevation: 0,
    marginRight: 0,
  },
  colorChipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  spotBox: {
    backgroundColor: '#F5F8FD',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotLabel: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
  spotValue: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 2,
  },
});