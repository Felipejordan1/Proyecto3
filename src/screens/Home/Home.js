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

    render(){
        return(
            <View >
                <Text>Home</Text>
            </View>
        )
    }
}
export default Home;