const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

//TODO aggiungere i filtri per la ricerca
exports.search = async (event, context, callback) => {
    const queryStringParameters = event["queryStringParameters"]; 
    const query = queryStringParameters !== undefined && queryStringParameters !== null ? queryStringParameters["q"] : null;
    let params = {
        TableName: process.env.DYNAMODB_TABLE
    };
    
    if (null != query){
        params = {
            ...params,
            ...{
                ExpressionAttributeNames: {
                "#p": "patient_data",
                "#n": "name"
                },
                ExpressionAttributeValues: {
                    ":q": query
                },
                FilterExpression: "contains(#p.#n, :q)"
            }
        }
    }

    try {
        const result = await dynamoDb.scan(params).promise();
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
};