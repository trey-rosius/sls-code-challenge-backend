/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      author
      title
      content
    }
  }
`;
export const allPosts = /* GraphQL */ `
  query AllPosts {
    allPosts {
      id
      author
      title
      content
    }
  }
`;
