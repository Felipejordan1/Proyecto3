import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
            nombrePost: "",
        }
    }
    postear(){
        db.collection("posts").add({
            owner:auth.currentUser.email,
            post:this.state.nombrePost,
            likes:[],
            createdAt:Date.now(),
        })
        .then(console.log('Tu posteo se subio correctamente'))
        .catch(error=>console.log(error))
    }
    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({nombrePost: text})}
                    placeholder='Postea algo'
                    keyboardType='default'
                    value={this.state.nombrePost}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.postear()}>
                    <Text style={styles.textButton}>Postea</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    buttonRegister:{
        color: "#000",
        padding:10,
        marginVertical:15,
        borderSolid:'solid',
        borderRadius:4,
        borderWidth:1,
        borderColor:'red',
        textAlign: 'center'
    }

})

export default PostForm