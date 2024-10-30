import { Button, StyleSheet, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: { backgroundColor: "#22c55e" },
          headerTintColor: "white",
          title: "",
          drawerHideStatusBarOnOpen: true,
          headerRight: () => <Button title='Mon Parcours' color='white' onPress={() => {router.push("/screens/gallery")}}/>,
        }}
      />
    </GestureHandlerRootView>
  );
}

const CustomDrawerContent = (props: any) => {
  const pathname = usePathname();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ backgroundColor: "#86efac", paddingTop: 70 }}
    >
      <DrawerItem
        icon={() => (
          <AntDesign
            name="home"
            size={25}
            color={pathname == "/screens" ? "black" : "gray"}
          />
        )}
        label="Accueil"
        labelStyle={[styles.drawerLabel,{color: pathname == "/screens" ? "black" : "gray" }]}
        style={{backgroundColor: pathname == "/screens" ? "white" : "#86efac" }}
        onPress={() => {
          router.navigate("/screens");
        }}
      />

      <DrawerItem
        icon={() => (
          <MaterialCommunityIcons
            name="account-outline"
            size={25}
            color={pathname == "/profile" ? "black" : "gray"}
          />
        )}
        label="Profil"
        labelStyle={[styles.drawerLabel,{color: pathname == "/profile" ? "black" : "gray" }]}
        style={{backgroundColor: pathname == "/profile" ? "white" : "#86efac" }}
        onPress={() => {
          router.navigate("/profile");
        }}
      />

      <DrawerItem
        icon={() => (
          <AntDesign
            name="setting"
            size={24}
            color={pathname == "/screens/parametres" ? "black" : "gray"}
          />
        )}
        label="paramètres"
        labelStyle={[styles.drawerLabel,{color: pathname == "/screens/parametres" ? "black" : "gray" }]}
        style={{backgroundColor: pathname == "/screens/parametres" ? "white" : "#86efac" }}
        onPress={() => {
          router.navigate("/screens/parametres");
        }}
      />

      <DrawerItem
        label="Deconnexion"
        labelStyle={styles.logOut}
        onPress={() => {
          router.replace("/auth/login");
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  logOut: {
    marginLeft: 0,
    fontSize: 18,
    color: "black",
    paddingTop:10
  },
});
