import { DynamoDB } from 'aws-sdk';
const dynamoDb = new DynamoDB.DocumentClient();

const _delete = async (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };
    try {
        const result = await dynamoDb.delete(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        callback(null, response);
    }
    catch (err) {
        console.error(err);
        callback(null, {
            statusCode: err.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t delete the patient item.',
        });
    }
};

export { _delete as delete };