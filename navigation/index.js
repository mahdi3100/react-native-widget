import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button,Pressable,Text,StyleSheet} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import Exchange from '../components/Toolbar/Toolbar.js';
import History from '../components/History/index.js';
import Search from '../components/History/FilterDate.js';
//import SearchTable from './components/FilterDate/index.js';

const Stack = createNativeStackNavigator();
function Navigation(){
 return(
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName='Exchange'>
            <Stack.Screen 
            name="Exchange"
             component={Exchange}
             options={({ navigation, route })=>({
                headerTitle: (props) => <Text {...props} >Exchange-Mehdi</Text>,
                headerRight: () => (
                  <Pressable
                  onPress={() => navigation.navigate('Live')}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <FontAwesome
                    name="history"
                    size={25}
                    //color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
                ),
              })}
               />
            <Stack.Screen name="Live" component={BottomTabNav} 
             //options={{ headerShown: false }} will remove the main header

             />
        </Stack.Navigator>
    </NavigationContainer>
 )

} 
const Tab = createBottomTabNavigator();
function BottomTabNav(){
return(
    <Tab.Navigator
    >
        <Tab.Screen name="History" component={History}
      
     options={{ headerShown: false, 
      tabBarIcon:({ focused, color, size })=>(<FontAwesome 
      name="table"
      size={25}
      //color={Colors[colorScheme].text}
      />)
    }}  //remove the header of tab its suck under header of stacknavigator
    />
        <Tab.Screen name="Search" component={Search}
        options={{ headerShown: false ,
          tabBarIcon:({ focused, color, size })=>(<FontAwesome 
            name="search"
            size={25}
            //color={Colors[colorScheme].text}
            />)
          }}  //remove the header of tab its suck under header of stacknavigator
         />
    </Tab.Navigator>
)
}
export default Navigation;