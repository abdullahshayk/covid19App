import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , ScrollView, Button, AsyncStorage,FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const FavCountries =({navigation,route})=> {
const [getdata,setData]=useState([]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    load();
    });
    return unsubscribe;
  },[]);

  const load =async()=>{

    console.log('loading...')
    // let keys=await AsyncStorage.getAllKeys();
    var fetched=await AsyncStorage.getItem(("@list"))
    console.log(JSON.parse(fetched))
    setData(JSON.parse(fetched));
                   
                 

  }

  const remove=async(country)=>{
    var rList=getdata.filter(item=> item!=country);
    setData(rList);
    console.log("removing....")
    await AsyncStorage.setItem(("@list"),JSON.stringify(rList))
    console.log("removed!")
    
   

  }
  const ClearList=async(country)=>{
    setData([]);
    AsyncStorage.clear();
    console.log("removed!")
   

  }




    return (
      <View style={styles.container}>
        <View style={{marginTop:30, width:300}}>
        <TouchableOpacity onPress={()=>ClearList()} style={{width:90,height:30,backgroundColor:"blue", position:"absolute", right:0, borderRadius:20, justifyContent:"center", alignItems:"center", backgroundColor:"#ff8600"}}><Text style={{fontSize:20, letterSpacing:2, fontWeight:"bold"}}>clear</Text></TouchableOpacity>
        </View>
        <FlatList
        data={getdata}
        style={{marginTop:30}}
      
        renderItem={({ item , index}) => (

          <View  style={{width:340, flexDirection:"row", alignItems:"center"}}>
            <TouchableOpacity
             onPress={()=>navigation.navigate("CountryStats", {countryName: item})}
              style={{
             
                padding: 10,
                borderWidth: 4,
                borderBottomColor: 'grey',
                margin:10, 
                width:250
            

              }}>
             
             
                <Text style={{fontWeight:"bold", fontSize:25, letterSpacing:4, color:"white"}}>
                  {item}
                </Text>
                
          
            </TouchableOpacity>
              <View style={{marginLeft:25}}>
              <FontAwesome onPress={()=>remove(item)} name="star-o" size={24} color="yellow" />
            </View>
          </View>
        )}
      />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"#292929"
    },
  });
  
  export default FavCountries;