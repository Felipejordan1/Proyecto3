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
            error:'',
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
                    campo: '' 
                })
            })
            .catch( erroneo => {
                console.log(erroneo);
                this.setState({error:erroneo.message})
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Image style={styles.image} source={require('../../../assets/InstaSport.PNG')} resizeMode= 'center'/>
                <Text style={styles.textoRegister}>Registrarme:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <Text style={styles.error}>{this.state.error}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='nombre de usuario'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <Text style={styles.error}>{this.state.error}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({biografia: text})}
                    placeholder='Esta es tu biografia, cuentanos algo de ti'
                    keyboardType='default'
                    value={this.state.biografia}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({profilePicture: text})}
                    placeholder='Podes poner tu foto de perfil aqui'
                    keyboardType='default'
                    value={this.state.profilePicture}
                />
                {this.state.email.length >4 && this.state.password.length >4 &&this.state.userName.length >4 ? ( <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>): (<Text></Text>)}
                <TouchableOpacity style={styles.buttonRegister} onPress={()=>this.props.navigation.navigate('Loguearse')}>
                    <Text style={styles.textButton}>¿Ya tenes cuenta? Inicia sesion</Text>  
                </TouchableOpacity>
                
            </View>
        )
    
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor: '#ff8370',
        height:'97vh'
    },
    textoRegister:{
        fontWeight:'bold',
        fontSize:30,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        backgroundColor:'white',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        padding:10,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'white'
    },
    textButton:{
        color: '#fff'
    },
    buttonRegister:{
        color: "#000",
        padding:10,
        marginVertical:10,
        borderSolid:'solid',
        borderRadius:4,
        borderWidth:1,
        borderColor:'white',
        textAlign: 'center',
        backgroundColor:'black'
    },
    image:{
        height:300,
        width:"100%"
    },
    error:{
        color: 'red'
    },

})


export default Registro;