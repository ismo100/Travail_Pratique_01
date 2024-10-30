import { View, Text, TouchableOpacity, TextInput, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Route } from "expo-router/build/Route";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const randonnee = () => {

  const userEmail = useSelector((state: RootState) => state.userState.email);
  const FILE_URI = FileSystem.documentDirectory + `${userEmail}.json`;
  const [sentier, setSentier] = useState("")
  
  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Veuillez autoriser l'accès à votre position.");
      return;
    }
  };

  const date = new Date();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (

    <View className="w-full h-full justify-center items-center">
      <View className="mb-10">
        <Text className="text-4xl font-extrabold">Let's go!</Text>
      </View>
      <View className=" gap-10 p-10 w-500">

      <View className="bg-white rounded-full w-full p-5 border border-green-500 flex-row gap-5">
              <TextInput
                placeholder="Le nom du sentier..."
                className="w-full text-2xl font-extralight pb-1"
                placeholderTextColor={"gray"}
                value={sentier}
                onChangeText={(text)=> {setSentier(text)}}
              />
            </View>

        <TouchableOpacity
          onPress={async () => {
            router.replace("/screens/start");
            getPermission();
            let currentLocation = await Location.getCurrentPositionAsync();
            let address = await Location.reverseGeocodeAsync({
              latitude : currentLocation.coords.latitude,
              longitude : currentLocation.coords.longitude,
            })

            
            try {
                const fileExists = await FileSystem.getInfoAsync(FILE_URI);
                if (fileExists.exists) {
                  
                  const data = JSON.stringify([{URI: " ", coords: currentLocation.coords, date: formattedDate, address : address, sentier : sentier}], null, 2)
                  await FileSystem.writeAsStringAsync(FILE_URI, data);
                }
                else{
                  const data = JSON.stringify([{URI: " ", coords: currentLocation.coords, date: formattedDate, address : address, sentier : sentier}], null, 2)
                  await FileSystem.writeAsStringAsync(FILE_URI, data);
              }
            } catch (error) {
              console.log(error);
            }
                    
          }}
        >
          <View className="bg-green-500 p-5 rounded-full items-center">
            <Text className="text-3xl color-white font-bold">GO</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

export default randonnee;
