import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';


class Buscador extends Component {
    constructor(props){
        super(props)
        this.state={
            todosUsers: [],
            usersFiltrados: [],
            searchText: '',

        }
    }

    componentDidMount(){
        //Traer datos
        db.collection('usuarios').onSnapshot(
            usuarios => {
                let usersDeDb = [];

                usuarios.forEach( unUser => {
                    usersDeDb.push(
                        {
                            id: unUser.id,
                            datos: unUser.data()
                        }
                    )
                })

                this.setState({
                    todosUsers: usersDeDb
                })
            }
        )
    }

    searchUsers(searchText){
      this.state.todosUsers.forEach( unUser => {
        if (searchText.length===0){
            this.setState({
                usersFiltrados: [],
                mensajeError: 'No hay resultados que coincidan.',


            })
        }
        if (unUser.datos.owner.includes(searchText) ) {
            if(this.state.usersFiltrados.includes(unUser))
            {null}
            else{this.state.usersFiltrados.push(unUser)}
        }
      })
    }



    render(){

        console.log(this.state.todosUsers);
        console.log(this.state.usersFiltrados);
        return(
            <ScrollView>
                
                <Text style={styles.title}>Encontra otros usuarios:</Text>
                <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=> (this.searchUsers(text), this.setState({searchText: text}))}
                    placeholder='Search user'
                    keyboardType='default'
                    value={this.state.searchText}>
                </TextInput>
                </View>

                {
                    this.state.usersFiltrados.length === 0 
                    ?
                    <Text style={styles.text}> Esperando tu busqueda...</Text>
                    :
                   
                    <FlatList 
                        data= {this.state.usersFiltrados}
                        keyExtractor={ unUser => unUser.id }
                        renderItem=
                        { ({item}) =>
                        <View style={styles.cadaResult}>
                            

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("SearchedUser", { owner: item.datos.owner })}>
                                <Image style={styles.profileImage}source={item.datos.profilePicture} />
                                <Text style={styles.rta}>User Name:  {item.datos.owner}</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        style= {styles.listaPosts}
                    />
                    
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    container:{
        flex: 1,
        backgroundColor: 'salmon',
        borderRadius: 6,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 25
    },
    input:{
        width: '65%',
        borderColor: 'lightgrey',
        borderWidth:5,
        borderRadius: 6,
        textAlign:'center',
        padding:5,

        
    },
    cadaResult:{
        backgroundColor:"salmon",
        padding:5,
        borderRadius: 6,
        margin:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderWidth: 3,
        borderColor: "black",

    },
    profileImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
        backgroundColor:"lightgrey",
        borderRadius: 50,
        margin:10,
        borderWidth: 3,
        borderColor: "black",


    },
    usuario:{
        alignItems:'center',
        margin:10,
    },

    image:{
        height: 100,
        paddingBottom: 5,
  },
  text:{
    textAlign:'center'
  },



})

export default Buscador;