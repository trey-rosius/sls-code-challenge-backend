import React, { Component,useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { addPost } from '../graphql/mutations';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';

const EditPostForm = (props) => {
    console.log(props);
    const initialState = { author: props.author, title: props.title, content: props.content };
const [formState, setFormState] = useState(initialState);
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
      }


      const useStyles = makeStyles({
        root: {
           
            '& > *': {
                marginTop:20,
                width: '25ch',
              },
          
        },
      });
      const classes = useStyles();
      

    async function addPostToGraphQl(event) {
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

    
<button className="add-post" onClick={addPostToGraphQl}>Create Post</button>
     </form>
   
        </div>
      );
    
  }
  export default EditPostForm