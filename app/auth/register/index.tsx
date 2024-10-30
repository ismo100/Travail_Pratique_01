import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Redirect, router } from "expo-router";
import * as FileSystem from "expo-file-system";

const index = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    address: "",
    password: "",
    confirmedPassword: "",
  });

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [errData, setErrData] = useState(false);
  const USERS_FILE = FileSystem.documentDirectory + "userData.json"

  const saveData = async () => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.dob ||
      !user.address ||
      !user.password ||
      !user.confirmedPassword ||
      user.password.length < 8 ||
      user.password != user.confirmedPassword
    ) {
      setErrData(true);
    } else {
      setErrData(false);

      const UserData = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        dod: user.dob,
        address: user.address,
        password: user.password,
        confirmedpass: user.confirmedPassword,
      };
      const existFile = await FileSystem.getInfoAsync(USERS_FILE)
        if(existFile.exists){
          const data = await FileSystem.readAsStringAsync(USERS_FILE)
          const saved = JSON.parse(data)
          const newData = [...saved, UserData]
          const newJsonUserData = JSON.stringify(newData,null,2)
          await FileSystem.writeAsStringAsync(USERS_FILE, newJsonUserData)
          console.log(newJsonUserData)
        }
        else{
          const data =  JSON.stringify([UserData], null, 2)
          await FileSystem.writeAsStringAsync(USERS_FILE, data)

        }
        router.replace("/auth/login")
      
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-white h-full w-full">
         <Image
          className="absolute"
          source={require("../../../assets/images/background.png")}
        />
        <View className="w-full h-full justify-center mt-15">
          <View className="flex items-center">
            <Text className="text-black text-3xl font-extralight">
              Créer votre compte
            </Text>
          </View>

          <View className="flex items-center p-10 gap-5 ">
            <View
              className={`bg-white rounded-full w-full p-3 border ${
                errData && !user.firstName
                  ? "border-red-500"
                  : "border-green-500"
              } flex-row gap-5 items-center pl-5`}
            >
              <FontAwesome5 name="user" size={17} color="gray" />
              <TextInput
                placeholder="Nom"
                className="w-full text-xl font-extralight pb-1"
                placeholderTextColor={"gray"}
                value={user.firstName}
                onChangeText={(text) => setUser({ ...user, firstName: text })}
              />
            </View>
            {errData && !user.firstName ? (
              <Text className="color-red-500 left-0 w-full -mt-4 -mb-4 pl-5 font-extralight">
                *Nom invalide
              </Text>
            ) : null}

            <View
              className={`bg-white rounded-full w-full p-3 border ${
                errData && !user.lastName
                  ? "border-red-500"
                  : "border-green-500"
              } flex-row gap-5 items-center pl-5`}
            >
              <FontAwesome5 name="user" size={17} color="gray" />
              <TextInput
                placeholder="Prénom"
                className="w-full text-xl font-extralight pb-1"
                placeholderTextColor={"gray"}
                value={user.lastName}
                onChangeText={(text) => setUser({ ...user, lastName: text })}
              />
            </View>
            {errData && !user.lastName ? (
              <Text className="color-red-500 left-0 w-full -mt-4 -mb-4 pl-5 font-extralight">
                *Prénom invalide
              </Text>
            ) : null}

            <View
              className={`bg-white rounded-full w-full p-3 border ${
                errData && !user.email ? "border-red-500" : "border-green-500"
              } flex-row gap-5 items-center pl-5`}
            >
              <Fontisto name="email" size={19} color="gray" />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                className="w-full text-xl font-extralight pb-1"
                placeholderTextColor={"gray"}
                value={user.email}
                onChangeText={(text) => setUser({ ...user, email: text })}
              />
            </View>
            {errData && !user.email ? (
              <Text className="color-red-500 left-0 w-full -mt-4 -mb-4 pl-5 font-extralight">
                *Email invalide
              </Text>
            ) : null}

            <View
              className={`bg-white rounded-full w-full p-3 border ${
                errData && !user.dob ? "border-red-500" : "border-green-500"
              } flex-row gap-5 items-center pl-5`}
            >
              <Fontisto name="date" size={18} color="gray" />
              <TextInput
                placeholder=" jj/mm/aaaa"
                className="w-full text-xl font-extralight pb-1"
                placeholderTextColor={"gray"}
                value={user.dob}
                onChangeText={(text) => setUser({ ...user, dob: text })}
              />
            </View>
            {errData && !user.dob ? (
              <Text className="color-red-500 left-0 w-full -mt-4 -mb-4 pl-5 font-extralight">
                *Date de naissance invalide
              </Text>
            ) : null}

            <View
              className={`bg-white rounded-full w-full p-3 border ${
                errData && !user.address ? "border-red-500" : "border-green-500"
              } flex-row gap-5 items-center pl-5`}
            >
              <Ionicons name="location-outline" size={22} color="gray" />
              <TextInput
                placeholder="Adresse postale"
                className="w-full text-xl font-extralight pb-1"
                placeholderTextColor={"gray"}
                value={user.address}
                onChangeText={(text) => setUser({ ...user, address: text })}
              />
            </View>
            {errData && !user.address ? (
              <Text className="color-red-500 left-0 w-full -mt-4 -mb-4 pl-5 font-extralight">
                *Adresse invalide
              </Text>
            ) : null}

            <View
              className={`bg-white rounded-full w-full p-3 border ${
                errData && !user.password
                  ? "border-red-500"
                  : "border-green-500"
              } flex-row gap-5 items-center pl-5`}
            >
              <AntDesign name="lock" size={24} color="gray" />
              <TextInput
                placeholder="Mot de passe"
                secureTextEntry={isSecureEntry}
                className="flex-1 text-xl font-extralight"
                placeholderTextColor={"gray"}
                value={user.password}
                onChangeText={(text) => setUser({ ...user, password: text })}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry((value) => !value);
                }}
              >
                {isSecureEntry ? (
                  <Ionicons name="eye-outline" size={24} color="gray" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="gray" />
                )}
              </TouchableOpacity>
            </View>
            {errData && !user.password ? (
              <Text className="color-red-500 left-0 w-full -mt-4 -mb-4 pl-5 font-extralight">
                *Mot de passe invalide
              </Text>
            ) : null}

            <View
              className={`bg-white rounded-full w-full p-3 border ${
                errData && !user.confirmedPassword || (user.password != user.confirmedPassword)
                  ? "border-red-500"
                  : "border-green-500"
              } flex-row gap-5 items-center pl-5`}
            >
              <AntDesign name="lock" size={24} color="gray" />
              <TextInput
                placeholder="Confirmez votre mot de passe"
                secureTextEntry={isSecureEntry}
                className="flex-1 text-xl font-extralight"
                placeholderTextColor={"gray"}
                value={user.confirmedPassword}
                onChangeText={(text) =>
                  setUser({ ...user, confirmedPassword: text })
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry((value) => !value);
                }}
              >
                {isSecureEntry ? (
                  <Ionicons name="eye-outline" size={24} color="gray" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="gray" />
                )}
              </TouchableOpacity>
            </View>
            {errData && !user.confirmedPassword || (user.password != user.confirmedPassword) ? (
              <Text className="color-red-500 left-0 w-full -mt-4 -mb-4 pl-5 font-extralight">
                *Mot de passe invalide
              </Text>
            ) : null}

            <View className="w-full">
              <TouchableOpacity
                style={styles.connexionButton}
                onPress={saveData}
              >
                <Text className="text-2xl text-center font-extralight color-white">
                  Inscription
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center">
              <Text className="font-extralight">Vous avez un compte ? </Text>
              <Link href="/auth/login" asChild>
                <TouchableOpacity>
                  <Text className="color-green-500 font-extralight underline">
                    Connectez-Vous
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default index;

const styles = StyleSheet.create({
  connexionButton: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 100,
    width: "auto",
  },
  forgotPassword: {
    marginLeft: 200,
  },
});
