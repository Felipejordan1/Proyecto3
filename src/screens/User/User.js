import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import Post from '../../components/Post';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

class User extends Component {
    constructor(){
        super()
        this.state={
            users: [],
            listaPost: [],
            cantPosts : ""
        }   
    }
    componentDidMount(){
        db.collection('usuarios').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let users = [];
                docs.forEach( doc => {
                    users.push({
                       id: doc.id,
                       data: doc.data()
                    })
                this.setState({
                    users: users
                })
                })
            }
        )
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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
                    listaPost: postsAMostrar ,
                    cantPosts: postsAMostrar.length
                })
            }
        )
    }

    logout(){
        auth.signOut()
        .then(() => {
            this.props.navigation.navigate('Loguearse')
            console.log(auth.currentUser.email);
        })
        .catch(e => {console.log(e)})
    }
    deleteUser(id){
        db.collection('usuarios').doc(id).delete()
        .then(() => {
            auth.currentUser.delete()
            this.props.navigation.navigate('Registro')
            console.log('Post eliminado');
        })
        .catch( e => console.log(e))
       }
    

    render(){
        console.log(this.state.cantPosts);
        console.log(this.state.users);
        return(
            <ScrollView>
                <Text style={styles.screenTitle}>Profile</Text>
                <View style={styles.mainContainer}>
                <Text style={styles.mail}>{auth.currentUser.email}</Text>
                <Text>Cantidad Posts: {this.state.cantPosts}</Text>
                <FlatList 
                        data= {this.state.users}
                        keyExtractor={ user => user.id }
                        renderItem={ ({item}) => 
                        <View>
                        <Text>Username: {item.data.username}</Text> 
                        <Text>Descripción: {item.data.ShortBio}</Text>
                        
                        </View>
                    }
                    />
                
                    
                <TouchableOpacity style={styles.button} onPress={()=>this.logout()}>
                    <Text style={styles.textButton}>Log out</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.screenTitle}>My Posts</Text>
                   
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post dataPost = { item } /> }
                        style= {styles.listaPosts}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.deleteUser(this.state.users[0].id)}>
                    <Text style={styles.textButton}>Borrar Perfil</Text>
                </TouchableOpacity>

                
            </ScrollView>
            
        )}
        }

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    image: {
        alignSelf: 'center',
        height: 80,
        width: "20%",
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 100
    },
    mainContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },


    button:{
        alignSelf: 'flex-end',
       
        backgroundColor:'#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        backgroundColor: "salmon",
        
       


    },
    textButton:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },
    mail: {
        fontSize: 20,
        textAlign: 'center',
    },

})

export default User;