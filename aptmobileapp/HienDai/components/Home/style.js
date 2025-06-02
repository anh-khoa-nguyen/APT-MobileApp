
import { StyleSheet } from 'react-native';
import Colors from '../../Styles/colors';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  apartmentNumber: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error,
  },
  summaryCard: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  
  summaryItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
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
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  paymentCard: {
    marginBottom: 12,
  },
  paymentCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  paymentDueDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  paymentRightContent: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  lockerCard: {
    marginBottom: 12,
  },
  lockerCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  packageDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  quickActionsCard: {
    padding: 0,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionText: {
    fontSize: 16,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  }, bannerSliderContainer: {
  width: "100%",
  height: 140,
  marginBottom: 24,
  marginTop: 8,
  alignItems: "center",
},
bannerSlide: {
  width: 320,
  height: 130,
  borderRadius: 18,
  overflow: "hidden",
  marginRight: 16,
  backgroundColor: "#fff",
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
},
bannerImage: {
  width: "100%",
  height: "100%",
  borderRadius: 18,
},
});
export default styles;