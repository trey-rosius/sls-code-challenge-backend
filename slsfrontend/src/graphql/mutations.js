/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addPost = /* GraphQL */ `
  mutation AddPost(
    $id: ID!
    $author: String!
    $title: String
    $content: String
  ) {
    addPost(id: $id, author: $author, title: $title, content: $content) {
      id
      author
      title
      content
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $id: ID!
    $author: String!
    $title: String
    $content: String
  ) {
    updatePost(id: $id, author: $author, title: $title, content: $content) {
      id
      author
      title
      content
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
