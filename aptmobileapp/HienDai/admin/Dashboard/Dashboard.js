import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Avatar, Text, Card, Button, Divider, Badge, List } from 'react-native-paper';
import styles from './styles';

const DashboardAdmin = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Image 
          size={56} 
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.adminText}>Admin User</Text>
        </View>
      </View>

      {/* Notification Cards */}
      <Card style={styles.card}>
        <Card.Title
          title="New Feedback"
          left={(props) => <Avatar.Icon {...props} icon="bell" style={styles.iconBlue} />}
          titleStyle={styles.cardTitle}
          subtitle="You have 2 new feedback items to review"
        />
      </Card>
      <Card style={styles.card}>
        <Card.Title
          title="Vehicle Approvals"
          left={(props) => <Avatar.Icon {...props} icon="car" style={styles.iconYellow} />}
          titleStyle={styles.cardTitle}
          subtitle="2 vehicle cards pending approval"
        />
      </Card>

      {/* Quick Stats */}
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Avatar.Icon icon="account-group" size={40} style={styles.iconBlue} />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Residents</Text>
          <Badge style={styles.badgePending}>Pending</Badge>
          <Text style={styles.statSubLabel}>1 pending</Text>
        </View>
        <View style={styles.statBox}>
          <Avatar.Icon icon="message" size={40} style={styles.iconPink} />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Feedback</Text>
          <Badge style={styles.badgeNew}>New</Badge>
          <Text style={styles.statSubLabel}>2 new</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Avatar.Icon icon="cube" size={40} style={styles.iconGreen} />
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Lockers</Text>
          <Text style={styles.statSubLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Avatar.Icon icon="car" size={40} style={styles.iconYellow} />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Vehicles</Text>
          <Badge style={styles.badgePending}>Pending</Badge>
          <Text style={styles.statSubLabel}>2 pending</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <Card style={styles.activityCard}>
        <List.Item
          title="New resident registered"
          description="Olivia Martinez moved into Apt 301"
          left={props => <List.Icon {...props} icon="account-plus" color="#1976D2" />}
          right={props => <Text style={styles.activityTime}>Today, 9:30 AM</Text>}
        />
        <Divider />
        <List.Item
          title="Feedback resolved"
          description="Heating issue in Apt 202 fixed"
          left={props => <List.Icon {...props} icon="check-circle" color="#1976D2" />}
          right={props => <Text style={styles.activityTime}>Yesterday, 4:45 PM</Text>}
        />
        <Divider />
        <List.Item
          title="Vehicle card approved"
          description="Michael Chen's Honda Civic"
          left={props => <List.Icon {...props} icon="car" color="#1976D2" />}
          right={props => <Text style={styles.activityTime}>May 22, 2025</Text>}
        />
      </Card>
    </ScrollView>
  );
};

export default DashboardAdmin;