import React,{useState,useEffect,useCallback,useContext} from 'react'
import { View } from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat'
import { AuthContext } from './AuthProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firestore from '@react-native-firebase/firestore';



const ChatScreen = ({ navigation}) => {
    const [messages, setMessages] = useState([]);
  
    
    const{user}= useContext(AuthContext);
    useEffect(() => {
        setMessages([
          {
            _id:1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id:2,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
        const subscriber = firestore()
      .collection('Users')
      .doc()
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
      }, [user?.uid])
     
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

      const renderBubble=(props) => {
        return(
            <Bubble {...props}
            wrapperStyle={{
                right:{
                  backgroundColor: '#2e64e5'
                }
            }}
            textStyle={{
              right:{
                color: '#fff'
              }
            }}
            />
        );
      }
      const renderSend = (props) => {
        return (
          <Send {...props}>
            <View>
              <MaterialCommunityIcons
                name='send-circle'
                style={{marginBottom: 5, marginRight: 5}}
                size={32}
                color="#2e64e5"
              />
            </View>
          </Send>
        );
      };
    
      const scrollToBottomComponent=() => {
          return(
            <FontAwesome name='angle-double-down' size={22} style={{color: '#333'}}/>
          )
      }

  return (
    <GiftedChat
      messages={messages}   
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  )
}

export default ChatScreen