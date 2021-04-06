
import React ,{useState,useEffect}from "react";
import {connect} from "react-redux";
import { View,StyleSheet,Text,ScrollView, TouchableOpacity,TextInput,Button,ImageBackground} from 'react-native';
import { StatusBar } from 'react-native';
function Home(props) {

  React.useEffect(() => {
    StatusBar.setBackgroundColor('#FF573300'); 
    StatusBar.setTranslucent(true)
   }, []);

  return(
    
    
    
  
    <ImageBackground source={require('../images/save.jpg')} style={{width: '100%', height: '100%'}}>
  <View style={styles.mainheading}> 
  <Text style={styles.fsh}>Sceb_File-Share</Text></View>

<View style={styles.mainP}>
  <View><Text style={styles.nipo}>Sceb_File-Share Provide's You Data Share World Wide with anyone with just one click and get Code </Text></View>
    <TouchableOpacity activeOpacity={0.8} onPress={()=>props.navigation.push('Sender')} style={styles.touchable}><Text style={styles.tex}>Sender</Text></TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8}  onPress={()=>props.navigation.push('Reciever')} style={styles.touchable}><Text style={styles.tex}>Reciever</Text></TouchableOpacity>

</View>
  </ImageBackground>


    )
}



const styles = StyleSheet.create({
  fsh:{
    fontSize:30,
    color:'#FF4500',
    fontWeight:'bold'
  },
  mainheading:{
flex:1,
margin:50,
alignItems:'center',
justifyContent:'center',

  },
mainP:{
  flex:50,
justifyContent:'center',
alignItems:'center',
},
touchable:{
  width:'50%',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#FF4537',
  marginTop:50,
  height:50

},
nipo:{
  margin:'-60%',
  marginHorizontal:40,
  color:'grey',
  fontSize:10

},tex:{
  color:'white',
  fontSize:20,
  fontStyle:'italic'
}

});
  const mapStateToProps = (state) => {
    return {
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
    
    }}

    export default connect(mapStateToProps,mapDispatchToProps)(Home)