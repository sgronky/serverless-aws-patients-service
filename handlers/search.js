import { DynamoDB } from 'aws-sdk';
const dynamoDb = new DynamoDB.DocumentClient();

//TODO aggiungere i filtri per la ricerca
export async function search(event, context, callback) {
    const query = event.queryStringParameters.q;
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        FilterExpression: 'contains(patient_data.name, :q)',
        ExpressionAttributeValues: {
            ':q': query
        }
    };
    try {
        const result = await dynamoDb.get(params).promise();
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
            body: 'Couldn\'t delete the patient item.',
        });
    }
}