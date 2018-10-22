import { DynamoDB } from 'aws-sdk';
const dynamoDb = new DynamoDB.DocumentClient();

//TODO: Manca la validazione degli oggetti inseriti nel DB
export async function update(event, context, callback) {
    const now = Date.now();
    const item = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: event.pathParameters.id,
        },
        UpdateExpression: 'SET patient_data = :pd, updatedAt = :ua',
        ExpressionAttributeValues: {
          ':pd': item.data,
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