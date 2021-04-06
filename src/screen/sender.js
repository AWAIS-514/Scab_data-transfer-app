
import React,{useState,useRef} from "react";
import {connect} from "react-redux";
import { View,StyleSheet,Text,ImageBackground,TouchableOpacity,TextInput} from 'react-native';
import storage from '@react-native-firebase/storage';
import FilePickerManager from 'react-native-file-picker';
import database from '@react-native-firebase/database';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';

function Sender({navigation})
{
  

  let [setclip,updateclip]=useState('none');
  let [touch,updatetouch]=useState('none');

const styles = StyleSheet.create({
  downbtn:{
    margin:10
  },
  main:{flex:1,
    alignItems:'center',
justifyContent:'center',
  },
  main1:{flex:2,
    alignItems:'center',
justifyContent:'center',
  }
 ,touchable:{
  
  width:'50%',
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#FF4537',
  marginTop:50,
  height:50
,
},touchableize:{
  display:touch,
  width:'50%',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#FF4537',
  marginTop:50,
  height:50
},
tex:{
  color:'white',
  fontSize:20,
  fontStyle:'italic'
}
 ,
 mui:{
   color:'#FF4500',
   marginTop:10,
   marginHorizontal:20
 },  muil:{
  color:'#FF4500',
  marginTop:10,
  fontSize:25,
  marginHorizontal:20
},
keycodes:{
  fontSize:20,
  color:'#FF4500'
},
clip:{
display:setclip,
color:'red'
},
clip1:{
  display:setclip,
  color:'#BDBDBD',
  marginHorizontal:50
  }
});

let [fileN,setfile]=useState({fileName:'',size:''})
let file;
let [keycode,usekeycode]=useState('')

const buttonc=useRef(null)
let [percentage,updatePercenteage]=useState();
  const selectFile= async()=>{

    return new Promise(function(myResolve, myReject) {
    FilePickerManager.showFilePicker(null, (response) => {
      if (response.didCancel) {
// console.log("cancel by user");
      }
      else if (response.error) {
        // console.log('FilePickerManager Error: ', response.error);
        
      }
      else 
      {
        setfile(response);
        file=response;
        const reference = storage().ref(`/Sender/${response.fileName}`);
        const task = reference.putFile(response.path);
      task.on('state_changed', taskSnapshot => {
        let n=(taskSnapshot.totalBytes/1048576).toFixed(2);
         
         let perc=Math.trunc(((taskSnapshot.bytesTransferred/taskSnapshot.totalBytes)*100));
updatePercenteage(perc);
 });
        task.then(() => {
    myResolve();

         
        });      }
  });
});


  }
  const sendurl=(url)=>{
    // console.log("sending url to firebase databadse?>>>>");
   let r = Math.random().toString(36).substring(7);
    let node={
  flink:`${url}`,
  fkey:`${r}`
}
updatetouch('flex')
    database().ref('/').child(`Sender/${r}`).set(node);
usekeycode(r);
 }

  const fileS=async ()=>{
  
    await selectFile();
  //  console.log("Link getting there now");
 let url=await storage()
    .ref(`/Sender/${file.fileName}`)
    .getDownloadURL();
    sendurl(url);
  
}    

const copyToClipboard = () => {
  Clipboard.setString(keycode)
   updateclip('flex');
}

return(
  
  
  <ImageBackground  source={require('../images/save.jpg')} style={{width: '100%', height: '100%'}}>
  <View  style={styles.main}>
    <Text style={styles.muil}>Upload File</Text>
  </View>
  <View style={styles.main1}>
  
<TouchableOpacity    onPress={()=>fileS()}  activeOpacity={0.8} style={styles.touchable}>
  <Text style={styles.tex}>Send</Text>
  <Icon name="upload" style={styles.downbtn} size={20}  color="#fff" />
</TouchableOpacity>


  <Text style={styles.mui}>Selected File:{fileN.fileName}</Text>
  <Text style={styles.mui}>Progress:{percentage}%</Text>

 </View>
  <View style={styles.main1}>
    
      <Text style={styles.keycodes} >
{keycode}
      </Text>
  <TouchableOpacity    onPress={()=>copyToClipboard()} activeOpacity={0.8} style={styles.touchableize}><Text style={styles.tex}>Click to Copy</Text>

  </TouchableOpacity>
<Text style={styles.clip}>Copied to ClipBoard</Text>
<Text style={styles.clip1}>Text is Copied to your clipboard now send this text to your reciver person</Text>
    
  </View>
  </ImageBackground>



    )





    
}



  const mapStateToProps = (state ) => {
    return {
    
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      
  
    
    }}

    export default connect(mapStateToProps,mapDispatchToProps)(Sender)