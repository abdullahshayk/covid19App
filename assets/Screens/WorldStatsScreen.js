import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , ScrollView, Button, FlatList} from 'react-native';


const WorldStatsScreen =()=> {
  const [getData,setData]=useState([]);
  const [getWorldpop,setWorldpop]=useState(7794798739);

  useEffect(() => {
    fetchData();
  }, []);

 const fetchData=()=>{
  fetch("https://covid-19-data.p.rapidapi.com/totals", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "d9df5eb23amshdbcdea70654a221p1b7c2fjsn1762b33a72f3",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
    }
  })
  .then((response)=>response.json())
  .then((responseJson)=>setData(responseJson))
  console.log(getData);
 

 }



    return (
      <View style={styles.container}>
  
        <View style={{marginTop:10, height:33,}}>
        <Text style={{color:"white", fontSize:30, fontWeight:"bold", letterSpacing:3}}>covid-19  Statistics</Text>
        <Text style={{color:"white", fontSize:20, fontWeight:"bold", letterSpacing:1, alignSelf:"center"}}>(WORLD STATS)</Text>

        </View>
         <FlatList
        data={getData}
        style={{marginTop:50, width:"100%"}}
        renderItem={({ item, index }) => (
         <View style={{justifyContent:"center", alignItems:"center"}}>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>Confirmed Cases: {item.confirmed}</Text>
         <Text style={styles.textt}>{(((item.confirmed)/getWorldpop)*100).toFixed(2)}%</Text>
         </View>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>Recoveries: {item.recovered}</Text>
         <Text style={styles.textt}>{(((item.recovered)/getWorldpop)*100).toFixed(2)}%</Text>
         </View>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>Critical Cases: {item.critical}</Text>
         <Text style={styles.textt}>{(((item.critical)/getWorldpop)*100).toFixed(3)}%</Text>
         </View>
         <View style={styles.texttContainer}>
         <Text style={styles.textt}>covid Deaths: {item.deaths}</Text>
         <Text style={styles.textt}>{(((item.deaths)/getWorldpop)*100).toFixed(2)}%</Text>
        
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
  
  export default WorldStatsScreen;