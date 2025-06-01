import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import ProfileScreen from "./screens/profile";
import CalendarScreen from "./screens/calendar";
import PlanSetterScreen from "./screens/plan-setter";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let icon;
            if (route.name === "Home") {
              icon = "home";
            }
            if (route.name === "Profile") {
              icon = "user";
            }
            if (route.name === "Calendar") {
              icon = "calendar-alt";
            }
            if (route.name === "Set Plan") {
              icon = "plus";
            }

            return <Icon name={icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarStyle: {
            flexDirection: "column",
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Set Plan" component={PlanSetterScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
