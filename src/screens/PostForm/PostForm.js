import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import MyCamera from "../../components/MyCamera";

class PostForm extends Component {
    constructor(){
        super()
        this.state={
            nombrePost: "", showCamera: true, url: '',showSuccessMessage: false 

        }
    }
    postear(){
        db.collection("posts").add({
            owner:auth.currentUser.email,
            post:this.state.nombrePost,
            photo: this.state.url,
            likes:[],
            createdAt:Date.now(),
            showSuccessMessage: true 

        })
        .then(console.log('Tu posteo se subio correctamente'))
        .catch(error=>console.log(`el error fue ${error}`))
    }

    onImageUpload(url){ 
        this.setState({ url: url , showCamera: false});
      }
    



    render(){
        return(


            <View style={styles.formContainer}>          
              
              <Text>Sube tu Posteo</Text>
    
            {this.state.showCamera ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> : 
    
            <>
    
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ nombrePost: text })}
              placeholder="Escribe tu post.."
              keyboardType="default"
              value={this.state.nombrePost}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.postear()}
            >
              <Text style={styles.textButton}>Postear</Text>
            </TouchableOpacity>
            </> }

              {this.state.showSuccessMessage &&  (
                      <View >
                          <Text >
                              Tu post ya está disponible en tu perfil
                          </Text>
                      </View>
                  )}

            
          </View>
        );
      }
    }

     
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    buttonRegister:{
        color: "#000",
        padding:10,
        marginVertical:15,
        borderSolid:'solid',
        borderRadius:4,
        borderWidth:1,
        borderColor:'red',
        textAlign: 'center'
    }

})

export default PostForm