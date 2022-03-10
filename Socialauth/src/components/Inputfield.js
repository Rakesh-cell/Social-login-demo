import React,{useState} from 'react'
import  {StyleSheet,View,TextInput,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import {Input} from 'react-native-elements';

/**
 * @author Rakesh
 * @params {name,Lefticon,ricon,msgerr,onChangeText,value,secureTextEntry,Label}
 */
 

const Inputfield = ({name,Lefticon,ricon,msgerr,onChangeText,value,secureTextEntry,Label}) => {
    // console.log(name,Lefticon);
    const[righticon,setRightIcon] =useState(ricon);
    const[securepass,setsecurepass] = useState(secureTextEntry);

    const iconclicked=()=>{
        if(righticon=='eye-off'){
            setRightIcon('eye')
            setsecurepass(false)
        }else if(righticon=='eye'){
            setRightIcon('eye-off')
            setsecurepass(true)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{Label}</Text>
          <View style={styles.inputContainer}>  
        <Icon
                    name={Lefticon}
                    color="black"
                    size={20}
                    
        /> 
        <TextInput style={styles.inputText}
            placeholder={name}
            secureTextEntry={securepass}
            value={value}
            onChangeText={onChangeText}
                
        />
        <Icon
                    name={righticon}
                    color="black"
                    size={20}
                    onPress={iconclicked}
        /> 
        </View>
        { msgerr?<Text style={styles.errstyle}>{msgerr}</Text>:null}
      </View>
    )
}

export default Inputfield;

const styles=StyleSheet.create({
   
     
   //
    container: {
        marginTop: 20,
        justifyContent: 'center',
        width:'90%'
    },
    title: {
        fontSize: 12,
        color: 'black',
        fontWeight:'bold',
    },
    inputText: {
        flex: 1,
        color: 'black',
    },
    inputContainer: {
        borderBottomWidth: 1,  
        borderColor: 'black',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        
    },
    errstyle: {
        color: 'red',
        fontSize: 10
    }
});

