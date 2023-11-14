import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home/Home';
import User from '../screens/User/User';
import PostForm from '../screens/PostForm/PostForm';
import Buscador from '../screens/Buscador/Buscador';
const Tab= createBottomTabNavigator();
class Menu extends Component {
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
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home} options={{headerShown:false}}/>
                <Tab.Screen name='Crear Posteo' component={PostForm} options={{headerShown:false}}/>
                <Tab.Screen name='Buscador' component={Buscador} options={{headerShown:false}}/>
                <Tab.Screen name='Usuario' component={User} options={{headerShown:false}}/>
            </Tab.Navigator>
        )
    }
}
export default Menu