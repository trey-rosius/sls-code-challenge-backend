# sls-code-challenge-backend
Serverless guru code challenge for the backend

### Overview
The code in this repository  outlines a GraphQl API, built with Serverless Framework as Iac, lambda resolvers and dynamoDB. 
The mapping templates make requests and get responses to and from the lambda functions. Mapping templates do not interact directly with the Dynamo DB table.

### GraphQL API
The graphQl APi supports 5 operations
- addPost
- updatePost
- getPost
- allPost
- deletePost

### Add Post Api Endpoint
```

  addPost(author: "Ateh Rosius", content: "this is the main content", id: "34", title: "title") {
    author
    content
    id
    title
  }


```
### Update Post Api Endpoint

```

  updatePost(author: "Rosius", content: "updated content", id: "34", title: "updated title") {
    author
    content
    id
    title
  }


```
### Delete Post Api Endpoint

```

  deletePost(id: "34") 

```

### get Post Api Endpoint

```

  getPost(id: "34") {
    author
    content
    id
    title
  }


```

### All Post Api Endpoint

```

  allPost {
    author
    content
    id
    title
  }


```

# CI/CD With Serverless Framework
I created a dev stage pipeline for the application





