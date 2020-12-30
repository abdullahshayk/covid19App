import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , ScrollView, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {Ionicons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import WorldStatsScreen from './assets/Screens/WorldStatsScreen';
import Countries from './assets/Screens/Countries';
import FavCountries from './assets/Screens/FavCountries';
import CountryStats from './assets/Screens/CountryStats';




const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
    activeColor="white"
    inactiveColor="black"
    barStyle={{
      backgroundColor:"grey",
      
    }}
    
    >
      <Tab.Screen name="Countries" 
      options={{
        tabBarIcon:()=><FontAwesome name="flag" size={24} color="black" />,
  
      }}
       component={MyStack2} />
      <Tab.Screen name="Favourites" 
       options={{
        tabBarIcon:()=><AntDesign name="star" size={24} color="black" />
      }}
      component={FavCountries} />
    </Tab.Navigator>
  );
}












const Drawer=createDrawerNavigator();

function MyDrawer(){
  return(
<Drawer.Navigator
drawerPosition="left"
drawerType="slide"
drawerContentOptions={{
      activeBackgroundColor: 'transparent',
      inactiveTintColor: 'black',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        color:"white"
      },
}}
drawerStyle={{
  backgroundColor:"grey",
  width:200
}}
>

<Drawer.Screen name="WorldStatsScreen" component={MyStack}
options={{
        drawerLabel:"World",
        drawerIcon:()=> <FontAwesome name="globe" size={24} color="black" />
          }}
           />


<Drawer.Screen name="CountryStatsScreen" component={BottomTabs}
options={{
      drawerLabel:"Countries",
      drawerIcon:()=> <FontAwesome name="flag" size={24} color="black" />

         }} />


<Drawer.Screen name="FavCountries" component={MyStack3}
options={{
     drawerLabel:"Favourites",
     drawerIcon:()=> <AntDesign name="star" size={24} color="black" />

}} />
</Drawer.Navigator>

  );
}






const Stack = createStackNavigator();

function MyStack({navigation}){
  return(
 <Stack.Navigator
    
    screenOptions={()=>({
    headerLeft:()=><AntDesign name="bars"  onPress={()=>navigation.openDrawer()} size={24} color="black" />
  
})}
 >
          <Stack.Screen 
          options={{
            title:"World Statistics",
            headerStyle:{
              
            }
          }}
        
          name="WorldScreen" component={WorldStatsScreen}/>
      
      </Stack.Navigator>

        

  );
}

function MyStack2({navigation}){
  return(
 <Stack.Navigator
    >
             <Stack.Screen 
             options={()=>({
              headerLeft:()=><AntDesign name="bars"  onPress={()=>navigation.openDrawer()} size={24} color="black" />
        
            })}
              name="Countries" component={Countries}/>
             <Stack.Screen 
             options={{
               title:"Country Statistics"
             }}
             name="CountryStats" component={CountryStats}/>
        </Stack.Navigator>
  );
}


function MyStack3({navigation}){
  return(
 <Stack.Navigator
    screenOptions={()=>({
      headerLeft:()=><AntDesign name="bars"  onPress={()=>navigation.openDrawer()} size={24} color="black" />

    })}>
             <Stack.Screen 
             options={{
               title:"Favourites"
             }}
             name="FavCountries" component={FavCountries}/>
        </Stack.Navigator>
 );
}



const App=()=> {
  return (
  <NavigationContainer>
  <MyDrawer/>
 </NavigationContainer>);

}









const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
