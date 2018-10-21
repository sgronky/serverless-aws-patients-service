'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//TODO: Manca la validazione degli oggetti inseriti nel DB
module.exports.add = async (event, context, callback) => {
    const now = Date.now();
    const item = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: event.pathParameters.id,
        },
        UpdateExpression: 'SET patient_data.checkups = list_append(patient_data.checkups, :chkup), updatedAt = :ua',
        ExpressionAttributeValues: {
          ':chkup': item.data,
          ':ua': now,
        },
        
        ReturnValues: 'ALL_NEW',
    };
    try {
        const result = await dynamoDb.put(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
          };
        callback(null, response);
    } catch (err) {
        console.error(err);
        callback(null, {
            statusCode: err.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the patient item.',
        });
    }
}

//TODO: Manca la validazione degli oggetti inseriti nel DB
module.exports.delete = async (event, context, callback) => {
    const now = Date.now();
    const item = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: event.pathParameters.id,
        },
        UpdateExpression: 'REMOVE patient_data.checkups[:idx], updatedAt = :ua',
        ExpressionAttributeValues: {
          ':idx': item.data,
          ':ua': now,
        },
        
        ReturnValues: 'ALL_NEW',
    };
    try {
        const result = await dynamoDb.put(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
          };
        callback(null, response);
    } catch (err) {
        console.error(err);
        callback(null, {
            statusCode: err.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the patient item.',
        });
    }
}