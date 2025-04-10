import { Tabs } from "expo-router";
import { Colors } from "./../../assets/Colors";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.dark.text,
        tabBarStyle: {
          backgroundColor: Colors.SECONDARY,
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingTop: 10,
          // paddingBottom: 14,
          alignItems: "center",
          justifyContent: "center",
          height: 75,
        },
        tabBarLabelStyle: {
          marginTop: 2,
          fontSize: 8.5,
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="treatments"
        options={{
          title: "Treatments",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "trail-sign" : "trail-sign-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="doc-channel"
        options={{
          title: "Channel",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fun-events"
        options={{
          title: "Fun Events",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
