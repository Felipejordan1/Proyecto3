import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import logo from '../../../assets/newgarden.jpg'

class Registro extends Component {
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
                <Image style={styles.image} source={require('../../../assets/logonewgarden.jpg')} resizeMode= 'center'/>
                <Text>Registrarme:</Text>
                <TextInput
                    style={styles.input1}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input2}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='nombre de usuario'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input1}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.input2}
                    onChangeText={(text)=>this.setState({biografia: text})}
                    placeholder='Esta es tu biografia, cuentanos algo de ti'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.biografia}
                />
                <TextInput
                    style={styles.input1}
                    onChangeText={(text)=>this.setState({profilePicture: text})}
                    placeholder='Podes poner tu foto de perfil aqui'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.profilePicture}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegister} onPress={()=>this.props.navigation.navigate('Loguearse')}>
                    <Text style={styles.textoBoton}>¿Ya tenes cuenta? Inicia sesion</Text>  
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        height:'97vh'
    },
    input2:{
        height:45,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#28a745',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    input1:{
        height:45,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#FF0000',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        padding:10,
        borderSolid:'solid',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#28a745',
        textAlign: 'justify',
        backgroundColor: '#28a745',
    },
    textButton:{
        color: '#fff'
    },
    buttonRegister:{
        padding:10,
        marginVertical:10,
        borderSolid:'solid',
        borderRadius:4,
        borderWidth:1,
        borderColor:'red',
        textAlign: 'justify',
        backgroundColor: '#FF0000',
    },
    image:{
        height:80,
        width:"100%",
    },
    textoBoton:{
        color:'#FFFFFF'
    }

})


export default Registro;