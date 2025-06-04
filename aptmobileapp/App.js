import React from 'react';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './HienDai/components/Home/Home';
import LoginScreen from './HienDai/components/Login/Login';
import ProfileScreen from './HienDai/components/Profile/Profile';
import ForgotAccountScreen from './HienDai/components/Login/ForgotAccount'; 
import Locker from './HienDai/components/Locker/Locker';
import Payment from './HienDai/components/Payment/Payment';
import Community from './HienDai/components/Community/Community';
import Vihicle from './HienDai/components/Vihicle/Vihicle';
import PaymentDetails from './HienDai/components/Payment/PaymentDetails';
import FeedbackDetails from './HienDai/components/Community/FeedbackDetails';
import SurveyDetails from './HienDai/components/Community/SurveyDetails';
import FeedbackCreate from './HienDai/components/Community/FeedbackCreate';
import VihicleCreate from './HienDai/components/Vihicle/VihicleCreate';
import First from './HienDai/components/Login/First';
import PaymentMomo from './HienDai/components/Payment/PaymentMomo'; // Đường dẫn đúng tới file

//Chat
import Chat from './HienDai/components/Chat/Chat';

// Admin
import DashboardAdmin from './HienDai/admin/Dashboard/Dashboard';
import ResidentAdmin from './HienDai/admin/Resident/Resident';
import FeedbackAdmin from './HienDai/admin/Feedback/Feedback';
import SurveyAdmin from './HienDai/admin/Survey/Survey';
import LockerAdmin from './HienDai/admin/Locker/Locker';
import VihicleAdmin from './HienDai/admin/Vihicles/Vihicle';
import SurveyCreate from './HienDai/admin/Survey/SurveyCreate';

// Etc
import { useContext, useReducer, useEffect, useState } from "react";
import { MyDispatchContext, MyUserContext } from './HienDai/configs/Contexts';
import { MyUserReducer } from './HienDai/configs/MyUserReducer';
import { createStack } from './HienDai/configs/Utils';
import { Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Variable
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack 
const StackCommunity = createStack(Stack, [
  { name: "Community", component: Community, options: { title: "Community" } },
  { name: "FeedbackDetails", component: FeedbackDetails, options: { title: "Feedback Detail" } },
  { name: "SurveyDetails", component: SurveyDetails, options: { title: "Survey Detail" } },
  { name: "FeedbackCreate", component: FeedbackCreate, options: { title: "Feedback Create" } },
]);

const StackVihicle = createStack(Stack, [
  { name: "Vihicle", component: Vihicle, options: { title: "Vihicle" } },
  { name: "VihicleCreate", component: VihicleCreate, options: { title: "New Card" } },
]);

const StackSurveyAdmin = createStack(Stack, [
  { name: "SurveyAdmin", component: SurveyAdmin, options: { title: "Survey" } },
  { name: "SurveyCreate", component: SurveyCreate, options: { title: "Survey Create" } },
]);

const ChatStack = createStack(Stack, [
  { name: "Chat", component: Chat, options: { title: "Chat", headerShown: false } },
]);

const PaymentStack = createStack(Stack, [
  { name: "Payment", component: Payment, options: { title: "Payment" } },
  { name: "PaymentDetail", component: PaymentDetails, options: { title: "Payment Detail" } },
  { name: "PaymentMomo", component: PaymentMomo, options: { title: "MoMo Payment" } },
]);

const linking = {
  prefixes: ['aptmobileapp://'],
  config: {
    screens: {
      Home: 'home',
      PaymentResult: 'payment-result',
    },
  },
};
//Tab
const TabNavigator = () => {
  const user = useContext(MyUserContext);
  console.log("User: ", user);

  const isAdmin = user && user.is_superuser;

  return (
    <Tab.Navigator>
      {user === null ? (
        <>
          <Tab.Screen name="Login" component={LoginScreen} options={{ title: "Login", tabBarIcon: () => <Icon size={30} source="account" /> }}/>
          <Tab.Screen name="ForgotAccount" component={ForgotAccountScreen} options={{ title: "Quên tài khoản", tabBarIcon: () => <Icon size={30} source="account-question" /> }} />
        </>
      ) : user?.change_password_required ? (
        // Nếu bắt buộc đổi mật khẩu, chỉ hiện tab First
        <Tab.Screen name="First" component={First} options={{ title: "First Login", tabBarIcon: () => <Icon size={30} source="information" /> }} />
      ) : isAdmin ? (
        <>
          <Tab.Screen name="DashboardAdmin" component={DashboardAdmin} options={{ title: "Dashboard", tabBarIcon: () => <Icon size={30} source="view-dashboard" /> }} />
          <Tab.Screen name="ResidentAdmin" component={ResidentAdmin} options={{ title: "Resident", tabBarIcon: () => <Icon size={30} source="account-group" /> }} />
          <Tab.Screen name="FeedbackAdmin" component={FeedbackAdmin} options={{ title: "Feedback", tabBarIcon: () => <Icon size={30} source="comment" /> }} />
          <Tab.Screen name="StackSurveyAdmin" component={StackSurveyAdmin} options={{ title: "Survey", headerShown:false, tabBarIcon: () => <Icon size={30} source="clipboard-text" /> }} />
          <Tab.Screen name="LockerAdmin" component={LockerAdmin} options={{ title: "Locker", tabBarIcon: () => <Icon size={30} source="lock" /> }} />
          <Tab.Screen name="VihicleAdmin" component={VihicleAdmin} options={{ title: "Vihicle", tabBarIcon: () => <Icon size={30} source="car" /> }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile", tabBarIcon: () => <Icon size={30} source="information" /> }} />
          <Tab.Screen name="ChatStack" component={ChatStack} options={{ title: "Chat", headerShown: false, tabBarIcon: () => <Icon size={30} source="chat" /> }} />
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={Home} options={{ title: "Home", tabBarIcon: () => <Icon size={30} source="home" /> }} />
          <Tab.Screen name="PaymentStack" component={PaymentStack} options={{ title: "Payment", tabBarIcon: () => <Icon size={30} source="credit-card" /> }} />
          <Tab.Screen name="Locker" component={Locker} options={{ title: "Locker", tabBarIcon: () => <Icon size={30} source="lock" /> }} />
          <Tab.Screen name="Vehicle" component={StackVihicle} options={{  title: "Vehicle", headerShown: false, tabBarIcon: () => <Icon size={30} source="car" /> }} />
          <Tab.Screen name="Community" component={StackCommunity} options={{ title: "Community", headerShown: false, tabBarIcon: () => <Icon size={30} source="comment" /> }} /> 
          <Tab.Screen name="PaymentDetail" component={PaymentDetails} options={{ title: "Payment Detail", tabBarIcon: () => <Icon size={30} source="credit-card" /> }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile", tabBarIcon: () => <Icon size={30} source="information" /> }} />
          <Tab.Screen name="ChatStack" component={ChatStack} options={{ title: "Chat", headerShown: false, tabBarIcon: () => <Icon size={30} source="chat" /> }} />
        </>
      )}
    </Tab.Navigator>
  );
}

//Main
const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  const [userToken, setUserToken] = useState(null);


  useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("access_token");
                setUserToken(token);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <PaperProvider>
          <NavigationContainer linking={linking}>
            <TabNavigator userToken={userToken}/>
          </NavigationContainer>
        </PaperProvider>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}


export default App;
