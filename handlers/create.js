const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const v1 = require('uuid');

//TODO: Manca la validazione degli oggetti inseriti nel DB
exports.create = async (event) => {
    const now = Date.now();
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            patient_data: { ...data },
            id: v1(),
            createdAt: now,
            updatedAt: now
        }
    };
    return await dynamoDb.put(params).promise();
}