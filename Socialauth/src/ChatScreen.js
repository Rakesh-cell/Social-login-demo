import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { AuthContext } from './AuthProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const { otherUser } = route.params;
  console.log("other user: " + otherUser);

  const { user } = useContext(AuthContext);
  // const [chatuser,setchatuser] = useState(null);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'user1',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'otheruser',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
    // const unsubscribe = firestore().collection('Users').doc(auth().currentUser.uid).collection('messages')
    // .doc(otherUser).onSnapshot((querySnapshot) => {
    //   const messagesFirestore = querySnapshot

    //       .filter(({ type }) => type === 'added')
    //       .map(({ doc }) => {
    //           const message = doc.data();
    //           console.log(message,"this is imp");
    //           return {
    //               ...message,
    //               createdAt: message.createdAt.toDate(),
    //           };
    //       })
    //       .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    //     appendMessages(messagesFirestore);
    // });
    // return () => unsubscribe();
    const unsubscribe = firestore()
      .collection('Users').doc(auth().currentUser.uid).collection('messages')
      .get()
      .then(querySnapshot => {
        const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
            const message = doc.data().m;
            if(doc.data().sendFrom==user?.uid && doc.data().sendTo==otherUser){
            return {
                ...message,
                createdAt: message.createdAt.toDate(),
            };
          }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    appendMessages(messagesFirestore);
      })
    return () => unsubscribe();
    },[])
      

      

    const appendMessages = useCallback(
      (messages) => {
          setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, messages)
          );
      },
      [messages]
  );

    async function handleSend(messages) {
      const sendTo = otherUser
      const sendFrom = user?.uid
      const writes = messages.map((m) => {

        m = {
          m,
          sendTo,
          sendFrom
        }
        firestore().collection('Users').doc(auth().currentUser.uid).collection('messages').add(m)
        firestore().collection('Users').doc(otherUser).collection('messages').add(m)

      });
      
      await Promise.all(writes);
    }

    const renderBubble = (props) => {
      return (
        <Bubble {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#2e64e5'
            }
          }}
          textStyle={{
            right: {
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
              style={{ marginBottom: 5, marginRight: 5 }}
              size={32}
              color="#2e64e5"
            />
          </View>
        </Send>
      );
    };

    const scrollToBottomComponent = () => {
      return (
        <FontAwesome name='angle-double-down' size={22} style={{ color: '#333' }} />
      )
    }

    return (
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
          _id: user?.uid,
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