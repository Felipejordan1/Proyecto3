import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList, ScrollView} from 'react-native';
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
        db.collection('usuarios').get(
            
        )
    }

    cerrarSesion(){
        auth.signOut();
        this.props.navigation.navigate("Loguearse");
        
    }
    render(){
        console.log(this.state)
        return(
            <ScrollView>
                <View style={styles.titulo}>
                    <Text style={styles.textoTitulo}>Home</Text>
                    <Text style={styles.textoTitulo}>Buenos dias {this.state.userName}</Text></View>
                    <TouchableOpacity onPress={()=>this.cerrarSesion()}>
                        <Text>Cerrar Sesion</Text>
                    </TouchableOpacity>
                
                <View style={styles.container}>
                    <Text style={styles.listadoTitulo}>Picture it</Text>

                    <FlatList 
                            data= {this.state.listaPost}
                            keyExtractor={ unPost => unPost.id } //generamos una clave unica por cada elemento
                            renderItem={({item}) => <Post dataPost = {item}/>}
                            style={styles.lista}
                    
                    />
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    lista:{
        width:'50vw'
    },
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
        
    },
    titulo:{
        backgroundColor:'black',
        flexDirection: 'row'
    },
    textoTitulo:{
        marginLeft:20,
        marginTop: 20,
        marginBottom:20,
        color:'#FFFFFF'
    },
    listadoTitulo:{
        fontSize:18,
        fontFamily:'Arial',
        fontWeight:"bold",
        marginTop:20,
        color: 'black'
    },
})
export default Home;