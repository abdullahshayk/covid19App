import React, { useState , useEffect} from 'react';
import { StyleSheet,  ActivityIndicator,Text, View, TextInput, TouchableOpacity, Alert , ScrollView, Button, FlatList, AsyncStorage} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Countries =({navigation})=> {
  const [isLoading, setLoading] = useState(true);
  const [getData,setData]=useState([]);
  const [toggle,settoggle]=useState(false)
  var txtView;
  var keyy=0;
  // const [i,seti]=useState(0);

  useEffect(() => {
    fetchData();
  },[]);

 const fetchData=()=>{
  fetch("https://world-population.p.rapidapi.com/allcountriesname", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "d9df5eb23amshdbcdea70654a221p1b7c2fjsn1762b33a72f3",
      "x-rapidapi-host": "world-population.p.rapidapi.com"
    }
  })
  .then((response)=>response.json())
  .then((responseJson) => {
    setLoading(false);
    setData(responseJson.body.countries);
  })
  .catch((error) => {
    console.error(error);
  });
 
 

 }

 if (isLoading) {
  return (
    <View style={{ flex: 1, padding: 20, }}>
      <ActivityIndicator size="large" color="blue" />
      <Text style={{alignSelf:"center"}}>Loading Data.....</Text>
    </View>
  );
}

const _onPress=async(item,key)=>{

  var dataa=await AsyncStorage.getItem("@list")
 if(dataa===null){
  await AsyncStorage.setItem(("@list"),JSON.stringify([item]))
  console.log("saved 1st")
 }
 else{
    var fetchdataa=JSON.parse(dataa);
    fetchdataa.push(item)
    await AsyncStorage.setItem(("@list"),JSON.stringify(fetchdataa))
    console.log("pushedd item ")
    
 }

 alert("Added to favourites!")


 console.log(fetchdataa)

  // const newToggleState=!toggle;
  // settoggle(newToggleState);
// var arry=[item]
  
//     console.log("saving..")
//           // AsyncStorage.clear();
//        await AsyncStorage.setItem(JSON.stringify(keyy++), JSON.stringify(arry));

//   console.log("saving done")
  

  



}
// txtView=toggle?".":"X";




    return (
      <View style={styles.container}>
         <FlatList
        data={getData}
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
            {/* <TouchableOpacity onPress={()=>_onPress(item,index)} style={{backgroundColor:"blue", height:40, width:40, borderRadius:20, justifyContent:"center", alignItems:"center"}}></TouchableOpacity> */}
            <FontAwesome onPress={()=>_onPress(item,index)} name="star" size={24} color="yellow" />
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
  
  export default Countries;