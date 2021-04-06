
import React ,{useState,useEffect,useref}from "react";
import {  Linking} from 'react-native';
import {connect} from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

import { View,StyleSheet,Text,SafeAreaView, TouchableOpacity,TextInput,Image,ImageBackground, DatePickerIOSBase} from 'react-native';

function Reciever(props) {
  let [download,setdowwnload]=useState('none');
  let [data,setupdate]=useState([]);
  let [link,setlink]=useState('https://google.com');
  let [code,setCode]=useState('');
  let [control,setControl]=useState('none');


  const styles = StyleSheet.create({
    downbtn:{
  margin:10
    },
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
  touchable1:{
    width:200,
    display:download,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#FF4537',
    marginTop:50,
    height:50
  
  },
  nipo:{
    marginHorizontal:40,
    color:'#FF4537',
    fontSize:10,
    marginTop:20
    
    
  
  },tex:{
    color:'white',
    fontSize:20,
    fontStyle:'italic',
  
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth:2,
borderColor:'transparent',
borderBottomColor:'#000',
marginHorizontal:30
  
  },
  jreci:{
    flex:3
  },
  tinyLogo: {
    width: 150,
    height: 150,
    marginTop:100
  },
  uipo:{
    display:control
  }
  
  });










const downloadImage = () => {
  // Main function to download the image
  
  // To add the time suffix in filename
  let date = new Date();
  // Image URL which we want to download
  let image_URL = link;
  // Getting the extention of the file
  let ext = getExtention(image_URL); 
  ext = '.' + ext[0];
  // Get config and fs from RNFetchBlob
  // config: To pass the downloading related options
  // fs: Directory path where we want our image to download
  const { config, fs } = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/file' + 
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'filer',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      
    });
};
const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ?
           /[^.]+$/.exec(filename) : undefined;
};



let submit=()=>{
  setControl('flex')
  let n=0;
  database().ref('/').child(`Sender`).on('value',function(v){
v.forEach(v => {
    if(v.val().fkey===code){
      n=1;
  setlink(v.val().flink);
  setControl('none')
  setdowwnload('flex')

    }
   
});




})  
}

  return(
    
    
    <SafeAreaView>
  
  <ImageBackground source={require('../images/save.jpg')} style={{width: '100%', height: '100%'}}>
  <View style={styles.mainheading}> 
      
  <Text style={styles.fsh}>Receiver</Text></View>
  <View style={styles.mainheading}> 
      
     </View>
  <TextInput
  onChangeText={setCode}
        style={styles.input}
        placeholder="Code paste here...."
        keyboardType="default"
      />
<View style={styles.mainP}>
  <View><Text style={styles.nipo}>Paste your code here for download file</Text></View>

      
 <TouchableOpacity activeOpacity={0.8}   style={styles.touchable} onPress={()=>submit()}><Text style={styles.tex} >Submit</Text></TouchableOpacity>


<View style={styles.uipo}>
<Image style={styles.tinyLogo}
   source={{uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif'}} />
</View>
<View style={styles.jreci}>
<TouchableOpacity activeOpacity={0.8} onPress={() =>downloadImage()}  style={styles.touchable1}><Text style={styles.tex}>

       Download
  </Text>
  <Icon name="download" style={styles.downbtn} size={20}  color="#fff" />
  </TouchableOpacity>



</View>
</View>
  </ImageBackground>

</SafeAreaView>

    )
}



  const mapStateToProps = (state) => {
    return {
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
    
    }}

    export default connect(mapStateToProps,mapDispatchToProps)(Reciever)