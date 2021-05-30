'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.graphql = (event, context, callback) => {
  const timestamp = new Date().getTime();
	console.log('Received event {}', JSON.stringify(event, 3));



	console.log('Got an Invoke Request.');
	switch (event.field) {

    case "addPost":{
      const params = {
        TableName: "Posts",
        Item: {
          id: event.arguments.id,
          author: event.arguments.author,
          title: event.arguments.title,
          content:event.arguments.content,
          
        },
      };
      dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
          console.error(error);
          callback(error, 'Couldn\'t update the post item.',);
          return;
        }
        // create a response
    
        // return the arguments back
      callback(error, params.Item);
     
      });
      break; 
    }

    case "updatePost":{
      const params = {
        TableName: "Posts",
        Key: {
          id: event.arguments.id,
        },
        ExpressionAttributeNames: {
          '#title': 'title',
 
        },
        ExpressionAttributeValues: {
          ':title': event.arguments.title,
          ':content':event.arguments.content,
          ':author':event.arguments.author
          
        },
        UpdateExpression: 'SET #title = :title, content = :content, author = :author',
        ConditionExpression: 'attribute_exists(id)',
        ReturnValues: 'ALL_NEW',
      };
      // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, 'Couldn\'t fetch the post item.',);
      return;
    }

    
    callback(error, result.Attributes);
  });
    
    break;

    }   
    case "getPost":{
      const params = {
        TableName: "Posts",
        Key: {
          id: event.arguments.id,
        },
      };
        
      // update the todo in the database
    dynamoDb.get(params, (error, result) =>  {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, 'Couldn\'t fetch the post item.',);
      return;
    }

    
    callback(error, result.Item);
  });
    
    break;

    } 
    case "getAllPost":{
      const params = {
        TableName: "Posts"
      
      };
        
      // update the todo in the database
    dynamoDb.scan(params, (error, result) =>  {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, 'Couldn\'t fetch the posts',);
      return;
    }

    
    callback(error, result.Items);
  });
    
    break;

    }  
    case "deletePost":{
      const params = {
        TableName: "Posts",
        Key: {
          id: event.arguments.id,
        },
      };
        
      // update the todo in the database
    dynamoDb.delete(params, (error, result) =>  {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, 'Couldn\'t delete the posts',);
      return;
    }

    
    callback(error, "deleted post successfully");
  });
    
    break;

    }     

		default: {
			callback(`Unknown field, unable to resolve ${event.field}`, null);
			break;
		}
	}
};