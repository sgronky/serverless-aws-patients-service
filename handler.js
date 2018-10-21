'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

'use strict';

const createPatient = require('./handlers/create');

module.exports.create = async (event, context, callback) => {
    const data = JSON.parse(event.body);
    try {
      let result = await createPatient(data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      });
    } catch (err) {
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the patient item.',
      });
    }
  };

  module.exports.retrieve = async (event, context, callback) => {
    const data = JSON.parse(event.body);
    try {
      let result = await retrievePatient(data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      });
    } catch (err) {
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the patient item.',
      });
    }
  };
