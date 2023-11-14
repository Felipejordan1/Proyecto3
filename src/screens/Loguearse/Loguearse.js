import react, { Component } from 'react';
import {auth} from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

class Loguearse extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            biografia:'',
            profilePicture:'',
            error:'',
        };
    }
    componentDidMount(){
        console.log('se monto la pagina');
        this.setState({
                    error:''
                })
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
            .catch( erroneo => {
                
                console.log(erroneo);
                this.setState({
                    error: erroneo.message 
                })
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Image style={styles.image} source={require('../../../assets/logonewgarden.jpg')} resizeMode= 'center'/>
                <Text>Login</Text>
                <TextInput
                    style={styles.input1}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input2}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                {this.state.email.length <4 && this.state.password <4 ?(<Text></Text>):(<TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email,this.state.password)}>
                    <Text style={styles.textButton}>Login</Text>    
                </TouchableOpacity>)}
                <TouchableOpacity style={styles.buttonRegister} onPress={()=>this.props.navigation.navigate('Registro')}>
                    <Text style={styles.textButton}>¿No tenes cuenta?</Text>  
                </TouchableOpacity>
                <Text style={styles.error}>{this.state.error}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        height:'97vh',
    },
    input2:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#FF0000',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    input1:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#28a745',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#FF0000',
        padding:10,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#FF0000'
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
        borderColor:'#28a745',
        textAlign: 'center',
        backgroundColor:'#28a745'
    },
    image:{
        height:80,
        width:"100%",
    },
    textoBoton:{
        color:'#FFFFFF'
    },
    error:{
        color: 'red'
    }

})


export default Loguearse;
