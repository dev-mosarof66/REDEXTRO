import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import ProfileScreen from "./screens/profile";
import CalendarScreen from "./screens/calendar";
import PlanSetterScreen from "./screens/plan-setter";
import Provider from "./store/Provider";
import Toast from "react-native-toast-message";
import {GestureHandlerRootView } from 'react-native-gesture-handler'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
              let icon;
              if (route.name === "Home") {
                icon = "home";
                return <Entypo name={icon} size={20} color={color} />;
              }
              if (route.name === "Profile") {
                icon = "user-alt";
              }
              if (route.name === "Calendar") {
                icon = "calendar";
                return <Foundation name={icon} size={24} color={color} />;

              }
              if (route.name === "Set Plan") {
                icon = "plus";
              }

              return <Icon name={icon} size={20} color={color} />;
            },
            tabBarActiveTintColor: "white",
            tabBarStyle: {
              flexDirection: "column",
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "bold",
            },
            tabBarInactiveTintColor: "#03045E",
            headerShown: false,
            tabBarActiveBackgroundColor: "#0077B6",
            tabBarInactiveBackgroundColor: "#00B4D8"
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Set Plan" component={PlanSetterScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


const Router = () => {
  return (
    <GestureHandlerRootView >
      <MyTabs />
      <Toast position="top" />

    </GestureHandlerRootView>
  )
}

export default Router;
