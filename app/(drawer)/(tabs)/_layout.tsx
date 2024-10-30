import React from 'react'
import { Stack, Tabs} from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Layout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>
  <Tabs.Screen
    name="screens"
    options={{
      tabBarLabel: 'Accueil',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" size={30} color={color} />
      ),
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerTitle:'Accueil'
    }}
  />
  <Tabs.Screen
    name="profile/index"
    options={{
      tabBarLabel: 'Profil',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="account-outline" size={35} color={color} />
      ),
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerTitle:'Profil'
    }}
  />
</Tabs>
  )
}