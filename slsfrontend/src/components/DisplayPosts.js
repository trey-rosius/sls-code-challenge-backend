import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import Button from '@material-ui/core/Button';
import { allPosts } from '../graphql/queries';
import { deletePost } from '../graphql/mutations';
import AddPostForm from './AddPostForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
import { AmplifySignOut } from '@aws-amplify/ui-react';


const DisplayPost = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])



  async function fetchPosts() {
    try {
      const postsData = await API.graphql(graphqlOperation(allPosts))
      console.log(postsData)
      const posts = postsData.data.allPosts;
      console.log(posts);
      setPosts(posts)
    } catch (err) { console.log('error fetching posts') }
  }
  async function deletePostFromGraphQl(postId){
      console.log("clicked");
      console.log(postId);
      
      try{
const deletePostsData = await API.graphql(graphqlOperation(deletePost,{id: postId})).then((value)=>{
    console.log(value);
    fetchPosts();
})
      }catch(err){

      }
  }

 

  return (
    <Router>
        <Switch>


        </Switch>
    <div className='post-container'>
     
      <div className="header">
      <h2>Amplify posts</h2>
      <div className="auth-btns">
      <Link to="/create-post"><Button variant="outlined" color="secondary" className="login">
        Create Post 
        </Button>   
        </Link>
      <AmplifySignOut />
      </div>
      </div>
      <Route exact path="/">
      <div className='post-content'>
      {
      
            posts.map((post, index) => (
          <div key={post.id ? post.id : index} className="post-item border-gradient border-gradient-purple">
            
            <p className="post-title">{post.title}</p>
            <p className="post-content1">{post.content}</p>
            <p className="post-author">{post.author}</p>
            <div className="btns">
            <Button color="secondary">Edit</Button>
            <Button color="primary" onClick={() => deletePostFromGraphQl(post.id) }>Delete</Button>
      
                </div>
          </div>
          
        ))
         
      }
       </div>
    </Route>
    <Route path="/create-post">
            <AddPostForm />

          </Route>
    </div>
    </Router>
  )
}



export default DisplayPost