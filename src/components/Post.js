import react, { Component } from 'react';
import {TouchableOpacity, View, Text, StyleSheet,Image,TextInput,FlatList} from 'react-native';
import {db, auth } from '../firebase/config';
import firebase from 'firebase';



class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            arrayComments: [],
            commentText: [],
            cantidadComments: 0,
        }
    }


    componentDidMount(){
        //Indicar si el post ya está likeado o no.
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }


   likear(){
    //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.

    //update en base de datos
    db.collection('posts').doc(this.props.dataPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: true,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))
   }

   comentar(comments, date){
    let comentar = {
        userName: auth.currentUser.email,
        createdAt:date,
        text: comments
    }
    db.collection('posts').doc(this.props.dataPost.id).update({
        arrayComments: firebase.firestore.FieldValue.arrayUnion(comentar)
    })
    .then(res => this.setState({
        user: auth.currentUser.email,
        comentar: this.props.dataPost.datos.comentario,
        cantidadComments: this.props.dataPost.datos.arrayComments.length
    })
    )
    .catch(e => console.log(e))
   }

   dislike(){
    //Quitar del array de likes al usario que está mirando el post.
    db.collection('posts').doc(this.props.dataPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))
   }



   deletePost(){
    db.collection('posts').doc(this.props.dataPost.id).delete()
    .then( res => {
        console.log('Post eliminado');
    })
    .catch( e => console.log(e))
   }

    render(){
        console.log(this.props);
        return(
            <View style={styles.contenedor}>
                <View style={styles.posteo}>
                    <Text style={styles.data}>Usuario: {this.props.dataPost.datos.owner}</Text>
                    <Image style={styles.camera} source={{uri:this.props.dataPost.datos.photo }}/>
                    <Text style={styles.data}>Titulo: {this.props.dataPost.datos.post}</Text>
                        <Text>Cantidad de Likes: {this.props.dataPost.datos.likes.length}</Text>




                    {/* If ternario */}
                    {this.state.like ? 
                        <TouchableOpacity style={styles.button2} onPress={()=>this.dislike()}>
                            <Text style={styles.textButton} >Dislike</Text>

                            

                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={()=>this.likear()}>
                            <Text style={styles.textButton} >Like</Text>
                        </TouchableOpacity>
                        }

                    {auth.currentUser.email == this.props.dataPost.datos.owner && 
                                <TouchableOpacity style={styles.deletebutton} onPress={()=>this.deletePost()} activeOpacity={0.7}>
                                    <Text style={styles.textButton}>Delete post</Text>
                                </TouchableOpacity>
                                }
                </View>
                <View style={styles.comentarios}>
                    {this.props.dataPost.datos.arrayComments != null ?(
                        <FlatList data={this.props.dataPost.datos.arrayComments} keyExtractor={(com)=> com.id} renderComentario={({comentario}) => (
                          <Text style={styles.comentario}>
                            <Text style={styles.usuarioComentario}>{comentario.userName}</Text>
                            <Text style={styles.comentarioShow}>{comentario.text}</Text>
                          </Text>
                        )}/>
                    ):(<Text style={styles.comentarioVacio}>Se el primero en comentar</Text>)}
                    <View style={styles.insertarComentario}>
                        <TextInput
                            style={styles.comentar}
                            onChangeText={(texto)=>this.setState({commentText: texto})}
                            placeholder='Comentar...'
                            keyboardType='default'
                            value={this.state.commentText}
                        />
                        {this.state.commentText.length === 0 ?(<Text></Text>):(<TouchableOpacity style={styles.buttonComentar} onPress={()=>this.comentar(this.state.commentText,Date.now())}>
                            <Text style={styles.textButton}>Enviar</Text>    
                        </TouchableOpacity>)}
                    </View>
                    <TouchableOpacity style={styles.buttonMasComentarios}>
                            <Text style={styles.textoBotonComentarios}  onPress={()=>this.props.navigation.navigate('Comentarios')}>Todos los comentarios</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign:'center',
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
      width:125,
      marginBottom: 5,
    },

    button2: {
        backgroundColor: "red",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign:'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
        width:125,
        marginBottom: 5,
      },

      deletebutton: {
        backgroundColor: "orange",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "orange",
        width:125,
        marginBottom: 5,
      },

    posteo:{
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        marginLeft:50,
    },

    camera: {
        height: 220,
        width: 300,
        border:'solid',
        borderSolid:'solid',
        borderRadius:4,
        borderWidth:1,
        borderColor:'white',
    },

    textButton: {
      color: "#fff",
    },
    

    data:{
        color:'Black',
        fontWeight:"bold",
        marginVertical:7,
        fontFamily:"Arial"
    },
    contenedor:{
        flexDirection:'row',
        backgroundColor:'#ff8370',
        borderStyle: 'solid',
        borderBlockColor:"black",
        borderWidth: 1,
        borderRadius:10,
        marginVertical:7,
        flex:1,
        alignItems:'center',
        width: "100%",
        height: "auto"
    },
    comentarios:{
        marginLeft:40,
    },
    comentar:{
        height:20,
        width:300,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        backgroundColor:'white',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    insertarComentario:{
        flexDirection:'row',
        alignContent:'center',
    },
    buttonComentar:{
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
        marginLeft:5,
        marginTop:15,
    },
    comentarioShow:{
        color:'black',
    },
    buttonMasComentarios:{
        backgroundColor:'black',
        padding:10,
        justifyContent:'center',
        alignContent:'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'black',
        height:30,
        width:170,
        marginLeft:5,
        marginTop:15,
    },
    textoBotonComentarios:{
        color:'white',
    },
    
  });

export default Post;