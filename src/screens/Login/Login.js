import react, { Component } from 'react';
import {auth} from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            biografia:'',
            profilePicture:'',
        };
    }
    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
            if (user){
                this.props.navigation.navigate("Menu")
            }
        })
    } 
    //cuando termine el home borrar el component did mount
    login (email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then((res)=>{
                console.log('El usuario ingreso correctamente', res);
                this.props.navigation.navigate("Menu")
            })
            .catch( error => {
                console.log(error);
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Menu')}>
                    <Text style={styles.textButton}>Login</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegister} onPress={()=>this.props.navigation.navigate('Register')}>
                    <Text>¿No tenes cuenta?</Text>  
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


export default Login;
