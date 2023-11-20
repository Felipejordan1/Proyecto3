import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Comentarios extends Component{
    constructor(props){
        super(props)
        this.state = {
            comentarioNuevo: "",
            id: "",
            data: {},
        }
    }
    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(doc=>{
            this.setState({id:doc.id,data:doc.data()})
        })
    }
    addComment(id,comentario){
        db.collection("posts")
        .doc(id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner:auth.currentUser.email,
                createdAt:Date.now(),
                comentario:comentario
            })
        })

    }
    render() {
        return (
          <View style={styles.container}>
            
            <Text style={styles.tituloComentarios}>Comentarios</Text>

            {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
              <View>
                <FlatList
                  data={this.state.data.comentarios}
                  keyExtractor={item => item.createdAt.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                      <Text style={styles.userText}>{item.owner}:</Text>
                      <Text>{item.comentario}</Text>
                    </View>
                  )}
                />
              </View>
            ) : (
              <Text>No hay comentarios aún.</Text>
            )}

              <TextInput
                onChangeText={text => this.setState({ comentarioNuevo: text })}
                keyboardType='default'
                placeholder='Comentar'
                value={this.state.comentarioNuevo}
                style={styles.input}
              />
              {this.state.comentarioNuevo.length >0 ?(
              <TouchableOpacity onPress={() => this.addComment(this.state.id, this.state.comentarioNuevo)} style={styles.button}>
                <Text style={styles.textButton}>Comentar</Text>
              </TouchableOpacity>):(<Text></Text>)
              }
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} style={styles.buttonMenu}>
                    <Text style={styles.textButton}>Volver al Home</Text>
                </TouchableOpacity>
          </View>
        );
      }
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  commentContainer: {
    backgroundColor:'#ff8370',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    padding: 10,
    margin: 10,
    borderRadius: 6,
  },
  userText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  tituloComentarios:{
    flexDirection:'row',
    backgroundColor:'black',
    color:'white',
    fontSize:30,
    justifyContent:'center',
    width:190,
    borderRadius: 6,
    marginLeft:80,
    padding:10,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
 
    input:{
      height:20,
      paddingVertical:15,
      paddingHorizontal: 10,
      borderWidth:1,
      borderColor:"lightgrey",
      borderRadius: 6,
      marginVertical:10,
  },

  button:{
    backgroundColor:'green',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius:4, 
    marginBottom:5,
 },
 buttonMenu:{
    backgroundColor:'black',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius:4, 
 },
 textButton:{
     color: 'white'
 },

});

export default Comentarios;