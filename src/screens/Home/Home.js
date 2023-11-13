import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList} from 'react-native';
import Post from "../../components/Post";

class Home extends Component {
    constructor(){
        super()
        this.state={
            listaPost:[],
        }

    }

    componentDidMount(){
        //Traer datos
        db.collection('posts').onSnapshot(
            posteos => {
                let postsAMostrar = [];
    
                posteos.forEach( unPost => {
                    postsAMostrar.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })
    
                this.setState({
                    listaPost: postsAMostrar
                })
            }
        )
    }

    cerrarSesion(){
        auth.signOut();
        this.props.navigation.navigate("Login");
        
    }
    render(){
        console.log(this.state)
        return(
            <View >
                <Text>Home</Text>
                <Text>Buenos dias {this.state.userName}</Text>
                <TouchableOpacity onPress={()=>this.cerrarSesion()}>
                    <Text>Cerrar Sesion</Text>
                </TouchableOpacity>
            
                <Text>Lista de posteos creados</Text>

                <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id } //generamos una clave unica por cada elemento
                        renderItem={({item}) => <Post dataPost = {item}/>}
                
                />
                        
                        

            </View>
        )
    }
}
export default Home;