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



    render(){
        console.log(this.props);
        return(
            <View style={styles.contenedor}>
                <Text style={styles.data}>Datos del Post</Text>
                <Text style={styles.data}>Email: {this.props.dataPost.datos.owner}</Text>
                <Text style={styles.data}>Texto: {this.props.dataPost.datos.post}</Text>
                <Image style={styles.camera} source={{uri:this.props.dataPost.datos.photo }}/>
                <Text>Cantidad de Likes: {this.props.dataPost.datos.likes.length}</Text>




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



    camera: {
        height: 220,
        width: 300,
    },

    textButton: {
      color: "#fff",
    },
    data:{
        color:'#FF0000',
        marginVertical:7
    },
    contenedor:{
        borderColor:'#28a745',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius:10,
        marginVertical:7,
        flex:1,
        alignItems:'center'
        
        
    },

    
  });

export default Post;