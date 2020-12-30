import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , ScrollView, Button, FlatList} from 'react-native';


const CountryStats =({navigation, route})=> {
  const [getData,setData]=useState([]);
  const [getCountrypop,setCountrypop]=useState();
  
  

  const {countryName}=route.params;
  console.log(countryName)



  useEffect(() => {
    fetchCountryData();
    fetchCountryPop();
  }, []);

 const fetchCountryData=()=>{
    fetch("https://covid-19-data.p.rapidapi.com/country?name="+countryName, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d9df5eb23amshdbcdea70654a221p1b7c2fjsn1762b33a72f3",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
  .then((response)=>response.json())
  .then((responseJson)=>setData(responseJson))
  
//   console.log(getData);
 

 }

 const fetchCountryPop=()=>{
    fetch("https://world-population.p.rapidapi.com/population?country_name="+countryName, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d9df5eb23amshdbcdea70654a221p1b7c2fjsn1762b33a72f3",
		"x-rapidapi-host": "world-population.p.rapidapi.com"
	}
})
  .then((response)=>response.json())
  .then((responseJson)=>setCountrypop(responseJson.body.population))
  
 

 }



    return (
      <View style={styles.container}>
  
        <View style={{marginTop:10, height:33,}}>
        <Text style={{color:"white", fontSize:30, fontWeight:"bold", letterSpacing:3}}>covid-19  Statistics</Text>
        <Text style={{color:"white", fontSize:20, fontWeight:"bold", letterSpacing:1, alignSelf:"center"}}>({countryName})</Text>

        </View>
         <FlatList
        data={getData}
        style={{marginTop:50, width:"100%"}}
        renderItem={({ item, index }) => (
         <View style={{justifyContent:"center", alignItems:"center"}}>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>Confirmed Cases: {item.confirmed}</Text>
         <Text style={styles.textt}>{(((item.confirmed)/getCountrypop)*100).toFixed(4)}%</Text>
         </View>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>Recoveries: {item.recovered}</Text>
         <Text style={styles.textt}>{(((item.recovered)/getCountrypop)*100).toFixed(4)}%</Text>
         </View>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>Critical Cases: {item.critical}</Text>
         <Text style={styles.textt}>{(((item.critical)/getCountrypop)*100).toFixed(4)}%</Text>
         </View>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>covid Deaths: {item.deaths}</Text>
         <Text style={styles.textt}>{(((item.deaths)/getCountrypop)*100).toFixed(4)}%</Text>
        
         </View>
         <Text style={{position:"absolute", bottom:0, right:0, color:"white", fontSize:10, marginBottom:3}}>Last Updated: {item.lastUpdate}</Text>
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
    textt:{
      fontSize:20,
      borderBottomColor:"gray",
      borderBottomWidth:.8,
      paddingVertical:2,
      color:"white",
      alignSelf:"center"
    },
    texttContainer:{
      padding:15,
      borderRadius:4,
      borderWidth:3,
      borderColor:"grey",
      marginBottom:30

    }
  });
  
  export default CountryStats;