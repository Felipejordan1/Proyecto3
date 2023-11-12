import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Home extends Component {
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
    cerrarSesion(){
        auth.signOut();
        this.props.navigation.navigate("Login");
        
    }
    render(){
        return(
            <View >
                <Text>Home</Text>
                <Text>Buenos dias {this.state.userName}</Text>
                <TouchableOpacity onPress={()=>this.cerrarSesion()}>
                    <Text>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Home;