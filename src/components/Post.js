import react, { Component } from 'react';
import {TouchableOpacity, View, Text, StyleSheet,Image} from 'react-native';
import {db, auth } from '../firebase/config';
import firebase from 'firebase';



class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,

        }


    }



    componentDidMount(){
        //Indicar si el post ya está likeado o no.
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
        )
    }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
      width: "30%",
      marginBottom: 5,
    },

    button2: {
        backgroundColor: "red",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
        width: "30%",
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
        width: "30%",
        marginBottom: 5,
      },

    camera: {
        height: 220,
        width: 300,
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

    
  });

export default Post;