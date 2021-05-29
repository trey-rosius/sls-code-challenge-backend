import React, { Component,useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { addPost } from '../graphql/mutations';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const AddPostForm = () => {
  const history = useHistory();
    const initialState = { author: '', title: '', content: '' };
const [formState, setFormState] = useState(initialState);
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
      }


     

    async function addPostToGraphQl(event) {
      console.log("clicked");
        event.preventDefault();
        const uuid = uuidv4();
        try {
          if (!formState.author || !formState.title || !formState.content) return;
          const post = {id:uuid, ...formState };
         // setTodos([...todos, todo])
         console.log(post);
         
         console.log(formState.author+formState.title + formState.content);
         setFormState(initialState);
          
          await API.graphql(graphqlOperation(addPost, post)).then((value)=>{
              console.log(value);
              let path = '/';
              history.push(path);
          });
        } catch (err) {
          console.log('error creating post:', err);
        }
      }
      
  

       

      return (
        <div className="container">
            <div className="page-title"> Create Post</div>
            <form className="form-style" noValidate autoComplete="off" >
         
         <TextField id="outlined-basic" 
         value={formState.author} 
         label="Author" 
      
       
         variant="outlined" 
         onChange={event => setInput('author', event.target.value)} />

         <TextField id="outlined-basic" 
         title={formState.title} 
         label="Title" 
         
         variant="outlined" 
         onChange={event => setInput('title', event.target.value)}/>

         <TextField id="outlined-basic" 
         content={formState.content} 
         label="Content" 
         variant="outlined" 
         multiline
          rows={4}
         onChange={event => setInput('content', event.target.value)} />

    

<button className="add-post" onClick={ addPostToGraphQl}>Create Post</button>
     </form>
   
        </div>
      );
    
  }
  export default AddPostForm