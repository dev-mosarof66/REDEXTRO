import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";

// Screens
import HomeScreen from "./screens/home";
import ProfileScreen from "./screens/profile";
import CalendarScreen from "./screens/calendar";
import PlanSetterScreen from "./screens/plan-setter";
import EditPlan from "./screens/EditPlan";
import Notification from './screens/notification'
import LoginScreen from "./screens/login";
import SignUpScreen from "./screens/signup";
import OnboardingScreen from "./screens/onboarding";

// Context Provider
import Provider from "./store/Provider";
import SetPlan from "./screens/setPlan";
import { useContext, useEffect } from "react";
import store from "./store/store";
import axiosInstance from "./axios/axios";
import { PaperProvider } from "react-native-paper";
import ErrorScreen from "./screens/error";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toasts } from "@backpackapp-io/react-native-toast";
import ResetPassword from "./screens/ResetPassword";
import VerifyEmailScreen from "./screens/verifyEmail";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {

  const { user, setUser } = useContext(store)

  const getUserData = async () => {
    await axiosInstance.get('/user').then((res) => {
      setUser(res.data.user)
    }).catch((error) => {
      console.log('error in route', error)
    })
  }


  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let icon;

          if (route.name === "Home") {
            icon = <Entypo name="home" size={20} color={color} />;
          } else if (route.name === "Set Plan") {
            icon = <Icon name="plus" size={20} color={color} />;
          } else if (route.name === "Calendar") {
            icon = <Foundation name="calendar" size={24} color={color} />;
          } else if (route.name === "Profile") {
            icon = <Icon name="user-alt" size={20} color={color} />;
          }

          return icon;
        },
        tabBarActiveTintColor: "#ffddd2",
        tabBarInactiveTintColor: "#a8dadc",
        tabBarActiveBackgroundColor: "#1e6091",
        tabBarInactiveBackgroundColor: "#001d3d",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
        },
        tabBarStyle: {
          flexDirection: "column",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Set Plan" component={PlanSetterScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Provider>
            <PaperProvider>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="onboarding" component={OnboardingScreen} /> */}
                <Stack.Screen name="tabs" component={MyTabs} />
                <Stack.Screen name="EditPlan" component={EditPlan} />
                <Stack.Screen name="Plan" component={SetPlan} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Signup" component={SignUpScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Error" component={ErrorScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
              </Stack.Navigator>
            </PaperProvider>
          </Provider>

          <Toasts globalAnimationType="spring" overrideDarkMode={true} />
        </SafeAreaProvider>

      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Router;
