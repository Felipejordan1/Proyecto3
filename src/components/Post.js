import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Button} from 'react-native';
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



    render(){
        console.log(this.props);
        return(
            <View>
                <Text>----------------------------------------------------</Text>
                <Text>Datos del Post</Text>
                <Text>Email: {this.props.dataPost.datos.owner}</Text>
                <Text>Texto: {this.props.dataPost.datos.post}</Text>

               {/* If ternario */}
               {this.state.like ? 
                <TouchableOpacity style={styles.button} onPress={()=>this.dislike()}>
                    <Text style={styles.textButton} >Dislike</Text>
                    

                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={()=>this.likear()}>
                    <Text style={styles.textButton} >Like</Text>
                </TouchableOpacity>
                }



            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 10,
      marginTop: 20,
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
    },
    button: {
      backgroundColor: "green",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "green",
      width: "30%",
    },
    textButton: {
      color: "#fff",
    },
  });

export default Post;