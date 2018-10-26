const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//TODO: Manca la validazione degli oggetti inseriti nel DB
exports.update = async (event, context, callback) => {
    const now = Date.now();
    const item = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: event.pathParameters.id,
        },
        Item: {
            'patient_data': {
                'M': item
            },
            'updateAt' : {
                'N': now
            }
        }
    };
    try {
        const result = await dynamoDb.put(params).promise();
        const response = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
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
};