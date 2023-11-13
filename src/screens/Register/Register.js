import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            biografia:'',
            profilePicture:'',
        }
    }

    register (email, pass, userName){
        auth.createUserWithEmailAndPassword(email, pass)
            .then((res)=>{
                console.log('Se ha registrado correctamente', res);
                db.collection('usuarios').add({
                    owner: auth.currentUser.email,
                    username: userName,
                    biografia: this.state.biografia,
                    profilePicture: this.state.profilePicture,
                    createdAt: Date.now(), 
                })
            })
            .catch( error => {
                console.log(error);
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegister} onPress={()=>this.props.navigation.navigate('Login')}>
                    <Text>¿Ya tenes cuenta? Inicia sesion</Text>  
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
        textAlign: 'justify'
    }

})


export default Register;