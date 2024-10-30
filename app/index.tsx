import { Provider } from 'react-redux';
import { store } from './redux/store';
import React, { useState } from 'react'
import { Redirect } from 'expo-router'


const index = () => {

    const [isAuth, setIsAuth] = useState(false);

  return (
    !isAuth ? <Redirect href={'/auth/login'}/>:<Redirect href={'/(drawer)/(tabs)/screens'}/>
  )
}

export default index