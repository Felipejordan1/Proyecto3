import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList, ScrollView, Image} from 'react-native';
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
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image style={styles.logoHeader} source={require('../../../assets/InstaSport.PNG')}/>
                        <View style={styles.menusHeader}>
                            <Text style={styles.textoHeader}>Home</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.textoHeader}>Buenos dias, {this.state.userName}</Text>
                        <View style={styles.headerRightButtons}>
                            <TouchableOpacity style={styles.buttonPerfil}>
                                <Text style={styles.textoPerfil}  onPress={()=>this.props.navigation.navigate('Usuario')}> Tu Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonCS} onPress={()=>this.cerrarSesion()}>
                                <Text style={styles.textoPerfil}>Cerrar Sesion</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                <View style={styles.container}>
                    <Text style={styles.listadoHeader}>InstaSport</Text>

                    <FlatList 
                            data= {this.state.listaPost}
                            keyExtractor={ unPost => unPost.id } //generamos una clave unica por cada elemento
                            renderItem={ ({item}) => <Post dataPost = {item} navigation={this.props.navigation} />  }
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
    header:{
        backgroundColor:'#ff8370',
        flexDirection: 'row',
        height:80,
        alignItems:'center',
        justifyContent:'space-between'
    },
    headerLeft:{
        flexDirection:'row',
        alignContent:'center',
    },
    menusHeader:{
        flexDirection:'row',
        alignContent:'center',
        marginTop:40,
        marginLeft:15,
    },
    headerRight:{
        flexDirection:'column',
        alignContent:'center',
        marginRight:20,
    },
    headerRightButtons:{
        flexDirection:'row',
    },
    listadoHeader:{
        fontSize:18,
        fontFamily:'Arial',
        fontWeight:"bold",
        marginTop:20,
        color: 'black'
    },
    textoHeader:{
        color:'black',
        fontWeight: 'bold',
    },
    logoHeader:{
        height:100,
        width:100,
        marginLeft:10,
    },
    buttonPerfil:{
        backgroundColor:'black',
        padding:10,
        justifyContent:'center',
        alignContent:'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'black',
        height:20,
        width:60,
        marginRight:5,
    },
    buttonCS:{
        backgroundColor:'black',
        padding:10,
        justifyContent:'center',
        alignContent:'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'black',
        height:20,
        width:80,
    },
    textoPerfil:{
        color:'white',
        fontSize:10,
    },
})
export default Home;