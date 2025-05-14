// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {
//     User,
//     Home,
//     Car,
//     LogOut,
//     ChevronRight,
//     Settings,
//     Shield,
//     HelpCircle
// } from 'lucide-react-native';   

// import { Card } from '../Card';
// import { useAuthStore } from '../../store/authStore';
// import { mockResidents } from '../../mocks/residents';

// import styles from "./style";
// import myStyles from "../../Styles/MyStyles";
// import Colors from "../../Styles/colors";

// export default function ProfileScreen() {
//     const navigation = useNavigation();
//     const { user, logout } = useAuthStore();

//     const residentInfo = user?.role === 'resident'
//         ? mockResidents.find(r => r.userId === user.id)
//         : null;

//     const handleLogout = () => {
//         Alert.alert(
//             'Confirm Logout',
//             'Are you sure you want to log out?',
//             [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                     text: 'Logout',
//                     style: 'destructive',
//                     onPress: async () => {
//                         await logout();
//                     }
//                 }
//             ]
//         );
//     };

//     const safeNavigate = (route) => {
//         try {
//             navigation.navigate(route);
//         } catch (e) {
//             console.warn('Navigation failed:', route);
//         }
//     };

//     return (
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//             <View style={styles.profileHeader}>
//                 <Image
//                     source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' }}
//                     style={styles.avatar}
//                 />
//                 <View style={styles.profileInfo}>
//                     <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
//                     <Text style={styles.role}>{user?.role === 'admin' ? 'Administrator' : 'Resident'}</Text>
//                     {residentInfo && (
//                         <Text style={styles.apartmentNumber}>Apartment {residentInfo.apartmentNumber}</Text>
//                     )}
//                 </View>
//             </View>

//             <Card style={styles.sectionCard}>
//                 <Text style={styles.sectionTitle}>Account</Text>

//                 <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={() => safeNavigate('PersonalInfo')}
//                 >
//                     <View style={styles.menuItemLeft}>
//                         <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(74, 111, 165, 0.1)' }]}>
//                             <User size={20} color={Colors.primary} />
//                         </View>
//                         <Text style={styles.menuItemText}>Personal Information</Text>
//                     </View>
//                     <ChevronRight size={20} color={Colors.textLight} />
//                 </TouchableOpacity>

//                 {user?.role === 'resident' && (
//                     <>
//                         <View style={styles.divider} />

//                         <TouchableOpacity
//                             style={styles.menuItem}
//                             onPress={() => safeNavigate('Apartment')}
//                         >
//                             <View style={styles.menuItemLeft}>
//                                 <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
//                                     <Home size={20} color={Colors.success} />
//                                 </View>
//                                 <Text style={styles.menuItemText}>Apartment Details</Text>
//                             </View>
//                             <ChevronRight size={20} color={Colors.textLight} />
//                         </TouchableOpacity>

//                         <View style={styles.divider} />

//                         <TouchableOpacity
//                             style={styles.menuItem}
//                             onPress={() => safeNavigate('Vehicles')}
//                         >
//                             <View style={styles.menuItemLeft}>
//                                 <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(255, 179, 71, 0.1)' }]}>
//                                     <Car size={20} color={Colors.secondary} />
//                                 </View>
//                                 <Text style={styles.menuItemText}>Manage Vehicles</Text>
//                             </View>
//                             <ChevronRight size={20} color={Colors.textLight} />
//                         </TouchableOpacity>
//                     </>
//                 )}
//             </Card>

//             <Card style={styles.sectionCard}>
//                 <Text style={styles.sectionTitle}>Settings</Text>

//                 <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={() => safeNavigate('Settings')}
//                 >
//                     <View style={styles.menuItemLeft}>
//                         <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
//                             <Settings size={20} color={Colors.info} />
//                         </View>
//                         <Text style={styles.menuItemText}>App Settings</Text>
//                     </View>
//                     <ChevronRight size={20} color={Colors.textLight} />
//                 </TouchableOpacity>

//                 <View style={styles.divider} />

//                 <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={() => safeNavigate('Privacy')}
//                 >
//                     <View style={styles.menuItemLeft}>
//                         <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(156, 39, 176, 0.1)' }]}>
//                             <Shield size={20} color="#9C27B0" />
//                         </View>
//                         <Text style={styles.menuItemText}>Privacy & Security</Text>
//                     </View>
//                     <ChevronRight size={20} color={Colors.textLight} />
//                 </TouchableOpacity>

//                 <View style={styles.divider} />

//                 <TouchableOpacity
//                     style={styles.menuItem}
//                     onPress={() => safeNavigate('Help')}
//                 >
//                     <View style={styles.menuItemLeft}>
//                         <View style={[styles.menuItemIcon, { backgroundColor: 'rgba(0, 188, 212, 0.1)' }]}>
//                             <HelpCircle size={20} color="#00BCD4" />
//                         </View>
//                         <Text style={styles.menuItemText}>Help & Support</Text>
//                     </View>
//                     <ChevronRight size={20} color={Colors.textLight} />
//                 </TouchableOpacity>
//             </Card>

//             <TouchableOpacity
//                 style={styles.logoutButton}
//                 onPress={handleLogout}
//             >
//                 <LogOut size={20} color={Colors.error} />
//                 <Text style={styles.logoutText}>Logout</Text>
//             </TouchableOpacity>

//             <Text style={styles.versionText}>Version 1.0.0</Text>
//         </ScrollView>
//     );
// }
