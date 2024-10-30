import 'react-native-reanimated';
import "../global.css"
import { Redirect, Stack, Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { Provider } from 'react-redux';
import { store } from './redux/store';



export default function Layout() {

return(
  <Provider store={store}>
<Stack>
  <Stack.Screen name='auth/login/index' options={{headerShown:false}}/>
  <Stack.Screen name='auth/register/index' options={{headerShown:false}}/>
  <Stack.Screen name='(drawer)' options={{headerShown:false}} />
</Stack>
</Provider>
)
}
