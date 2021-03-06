import React, {useContext,useState,useEffect} from 'react'
import{View,Text,Button,StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';



const ChatUsers = ({ navigation}) => {

  const{user}= useContext(AuthContext);
  const [list,setlist]=useState()

  //get all registered users
  useEffect(() => {
      firestore()
    .collection('Users')
    .get()
    .then(querySnapshot => {
   const ulist=[]
  
      console.log('Total users: ', querySnapshot.size);
  
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        if(auth().currentUser.uid != documentSnapshot.data().userId){
          ulist.push(documentSnapshot.data())
        }
  
      });
  setlist(ulist)
  
  
    });
  },[])
  
  console.log(list,"ok");
 

    // const Messages = [
    //     {
    //       id: '1',
    //       userName: 'Jenny Doe',
    //       userImg: require('./assets/user.png'),
    //       messageTime: '4 mins ago',
    //       messageText:
    //         'Hey there, this is my test for a post of my social app in React Native.',
    //     },

    //   ];
      const userImg= require('./assets/user.png');
    const  messageTime= '4 mins ago'
  return (
    <View style={styles.container}>
        <FlatList 
          data={list}
          keyExtractor={item=>item.userId}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat',{userName: item.fname, otherUser:item.userId})}>
              <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                  <Image style={styles.userImg} source={userImg} />
                </View>
                <View style={styles.textSection}>
                  <View style={styles.userInfotext}>
                    <Text style={styles.userName}>{item.fname} {item.lname}</Text>
                    <Text style={styles.posttime}>{messageTime}</Text>
                  </View>
                  <Text style={styles.MessageText}>{item?.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
  )
};

export default ChatUsers;

const styles = StyleSheet.create({
    container1: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    // container
    container:{
        flex: 1,
        paddingLeft:20,
        paddingRight:20,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    card:{
        width:'100%',
    },
    userInfo: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    userImgWrapper:{
        paddingTop:15,
        paddingBottom:15,
    },
    userImg: {
        width:50,
        height:50,
        borderRadius:26,
    },
    textSection:{
        flexDirection:'column',
        justifyContent: 'center',
        padding:15,
        paddingLeft:0,
        marginLeft:10,
        width:300,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc',
        
    },
    userName: {
        fontSize:14,
        fontWeight:'bold',
        // fontFamily:'Lato-Regular',
    },
    userInfotext: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom:5,
    },
    posttime:{
        fontSize:12,
        color: '#666',
        // fontFamily:'Lato-Regular',
    },
    MessageText:{
        fontSize:14,
        color: '#333333'
    }
  });