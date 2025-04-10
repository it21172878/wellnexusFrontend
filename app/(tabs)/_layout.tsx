import { Tabs } from "expo-router";
import { Colors } from "./../../assets/Colors";
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

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
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="treatments"
        options={{
          title: "Treatments",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="healing" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="doc-channel"
        options={{
          title: "Channel",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-doctor" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fun-events"
        options={{
          title: "Fun Events",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="emoji-events" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
