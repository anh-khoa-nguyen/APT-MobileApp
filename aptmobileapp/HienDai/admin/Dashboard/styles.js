import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
  },
  adminText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  card: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconBlue: {
    backgroundColor: '#1976D2',
  },
  iconYellow: {
    backgroundColor: '#FFD600',
  },
  iconPink: {
    backgroundColor: '#F8BBD0',
  },
  iconGreen: {
    backgroundColor: '#80CBC4',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    color: '#222',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 6,
    borderRadius: 10,
    paddingVertical: 14,
    elevation: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#222',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  statSubLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  badgePending: {
    backgroundColor: '#FFF9C4',
    color: '#FBC02D',
    marginTop: 4,
    alignSelf: 'center',
  },
  badgeNew: {
    backgroundColor: '#F8BBD0',
    color: '#C2185B',
    marginTop: 4,
    alignSelf: 'center',
  },
  activityCard: {
    marginTop: 8,
    borderRadius: 12,
    elevation: 2,
    paddingVertical: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'center',
    marginRight: 8,
  },
});