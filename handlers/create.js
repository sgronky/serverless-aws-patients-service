import { DynamoDB } from 'aws-sdk';
const dynamoDb = new DynamoDB.DocumentClient();
import { v1 } from 'uuid';

//TODO: Manca la validazione degli oggetti inseriti nel DB
export async function create(event, context, callback) {
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