import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import VehiclesScreen from './src/screens/VehiclesScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import AboutScreen from './src/screens/AboutScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              height: 60,
              paddingBottom: 8,
              paddingTop: 6,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Home: 'home-outline',
                Map: 'map-outline',
                Vehicles: 'car-sport-outline',
                Feedback: 'chatbubble-ellipses-outline',
                About: 'information-circle-outline',
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{ title: 'Live Map', headerTitle: 'Live Traffic Map' }}
          />
          <Tab.Screen
            name="Vehicles"
            component={VehiclesScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
