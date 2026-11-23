import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Watchlist: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>{title}</Text>
  </View>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'film-outline';
          if (route.name === 'Home') iconName = 'flame-outline';
          else if (route.name === 'Search') iconName = 'search-outline';
          else if (route.name === 'Watchlist') iconName = 'bookmark-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" options={{ title: 'Keşfet' }}>
        {() => <PlaceholderScreen title="Keşfet Ekranı (10. Hafta)" />}
      </Tab.Screen>
      <Tab.Screen name="Search" options={{ title: 'Arama' }}>
        {() => <PlaceholderScreen title="Arama Ekranı (11. Hafta)" />}
      </Tab.Screen>
      <Tab.Screen name="Watchlist" options={{ title: 'Listem' }}>
        {() => <PlaceholderScreen title="İzleme Listem (12. Hafta)" />}
      </Tab.Screen>
      <Tab.Screen name="Profile" options={{ title: 'Profil' }}>
        {() => <PlaceholderScreen title="Profil Ekranı (13. Hafta)" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
  },
});