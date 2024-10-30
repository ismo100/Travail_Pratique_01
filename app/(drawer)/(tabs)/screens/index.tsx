import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

const index = () => {
  return (
    <View className='w-full h-full justify-center items-center'>
      
      <View className='mb-10'>
          <Text className='text-4xl font-extrabold'>Choisissez un scénario.</Text>
        </View>
      <View className=' gap-10 p-10 w-500'>

        <TouchableOpacity>
        <View className='bg-green-500 p-10 rounded-full items-center'>
          <Text className='text-3xl color-white font-bold'>Voyage</Text>
        </View>
        </TouchableOpacity>

<Link href={"/(drawer)/(tabs)/screens/randonnee"} asChild>
        <TouchableOpacity>
        <View className='bg-green-500 p-10 rounded-full items-center'>
          <Text className='text-3xl color-white font-bold'>Randonnée</Text>
        </View>
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default index