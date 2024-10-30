import { View, Text, Button, TouchableOpacity, Keyboard, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import * as FileSystem from "expo-file-system";
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from 'expo-router';

const index = () => {

  const userEmail = useSelector((state: RootState) => state.userState.email);
  const USERS_FILE = FileSystem.documentDirectory + "userData.json"
  const [user, setUser] = useState<any>([])
  const [edit, setEdit] = useState(false) 
  const [editFirstName, setEditFirstName] = useState(false)
  const [editLastName, setEditLastName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editDob, setEditDob] = useState(false)
  const [editAddress, setEditAddress] = useState(false)

  const [newValue, setNewValue] = useState<any>({
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    dob: user.dob,
    address: user.address,
    password: user.password,
    confirmedPassword: user.confirmedPassword,
  });
  
  const loadData = async()=>{
    const existFile = await FileSystem.getInfoAsync(USERS_FILE)
    if(existFile.exists){
      const data = await FileSystem.readAsStringAsync(USERS_FILE)
      const savedData = JSON.parse(data)
      const result = savedData.find((element : any) =>  element.email === userEmail);
      setUser(result)
    }
}
useEffect(()=> {
  loadData()
},[])

const saveEdit = () =>{
  const userData = {
    firstName: newValue.firstName,
    lastName: newValue.lastName,
    email: newValue.email,
    dob: newValue.dob,
    address: newValue.address,
    password: newValue.password,
    confirmedPassword: newValue.confirmedPassword,
  }
}

  return (  
      <View className='h-full w-full'>
        <View className='w-full h-full justify-center items-center p-10'>
          <View className='w-full items-center'>
            <Text className='font-bold text-3xl pb-5'>{edit?newValue.firstName:user.firstname} {edit?newValue.lastName:user.lastname}</Text>
            <MaterialIcons name="account-circle" size={150} color="gray" />
          </View>

          <View className="flex items-center p-10 gap-5">

                <View  className="bg-white rounded-full w-full p-3 border border-green-500 flex-row gap-5 items-center pl-5 ">
                <FontAwesome5 name="user" size={17} color="gray" />
                  <TextInput
                  className="w-full text-xl font-extralight pb-1"
                  value={editFirstName?newValue.firstName:user.firstname}
                  onChangeText={(text) => {setNewValue({...newValue, firstName: text})}}
                  />
                  <TouchableOpacity onPress={() => {setEditFirstName(true)}}>
                    <AntDesign name="edit" size={20} color="gray" />
                  </TouchableOpacity>
                </View>

                <View  className="bg-white rounded-full w-full p-3 border border-green-500 flex-row gap-5 items-center pl-5 ">
                <FontAwesome5 name="user" size={17} color="gray" />
                  <TextInput
                  className="w-full text-xl font-extralight pb-1"
                  value={editLastName?newValue.lastName:user.lastname}
                  onChangeText={(text) => {setNewValue({...newValue, lastName: text})}}
                  />
                  <TouchableOpacity onPress={() => {setEditLastName(true)}}>
                    <AntDesign name="edit" size={20} color="gray" />
                  </TouchableOpacity>
                </View>

                <View  className="bg-white rounded-full w-full p-3 border border-green-500 flex-row gap-5 items-center pl-5 ">
                <Fontisto name="email" size={19} color="gray" />
                  <TextInput
                  className="w-full text-xl font-extralight pb-1"
                  value={editEmail?newValue.email:user.email}
                  onChangeText={(text) => {setNewValue({...newValue, email: text})}}
                  />
                  <TouchableOpacity onPress={() => {setEditEmail(true)}}>
                    <AntDesign name="edit" size={20} color="gray" />
                  </TouchableOpacity>
                </View>

                <View  className="bg-white rounded-full w-full p-3 border border-green-500 flex-row gap-5 items-center pl-5 ">
                <Fontisto name="date" size={18} color="gray" />
                  <TextInput
                  className="w-full text-xl font-extralight pb-1"
                  value={editDob?newValue.dob:user.dod}
                  onChangeText={(text) => {setNewValue({...newValue, dob: text})}}
                  />
                  <TouchableOpacity onPress={() => {setEditDob(true)}}>
                    <AntDesign name="edit" size={20} color="gray" />
                  </TouchableOpacity>
                </View>

                <View  className="bg-white rounded-full w-full p-3 border border-green-500 flex-row gap-5 items-center pl-5 ">
                <Ionicons name="location-outline" size={22} color="gray" />
                  <TextInput
                  className="w-full text-xl font-extralight pb-1"
                  value={editAddress?newValue.address:user.address}
                  onChangeText={(text) => {setNewValue({...newValue, address: text})}}
                  />
                  <TouchableOpacity onPress={() => {setEditAddress(true)}}>
                    <AntDesign name="edit" size={20} color="gray" />
                  </TouchableOpacity>
                </View>

          </View>

          <View className="w-full">
              <TouchableOpacity
                style={styles.connexionButton}
                onPress={() => {
                  saveEdit()
                  router.back()
                  setEdit(true)
                }}
              >
                <Text className="text-2xl text-center font-extralight color-white">
                Enregistrer
                </Text>
              </TouchableOpacity>
            </View>
          
        </View>
      </View>

  )
}

export default index

const styles = StyleSheet.create({
  connexionButton: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 100,
    width: "auto",
  }
});