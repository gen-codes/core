// const jwk = require('jsonwebtoken');
// const jwkToPem = require('jwk-to-pem');
const request = require('request');

// For Auth0:       https://<project>.auth0.com/
// refer to:        http://bit.ly/2hoeRXk
// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
// refer to:        http://amzn.to/2fo77UI
const iss = process.env.AUTH0_DOMAIN;

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if(effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  console.log("policy", authResponse);
  return authResponse;
};

// {
//   "Version": "2012-10-17",
//   "Statement": [
//       {
//           "Sid": "Stmt1459758003000",
//           "Effect": "Allow",
//           "Action": [
//               "execute-api:Invoke"
//           ],
//           "Resource": [
//               "arn:aws:execute-api:*"
//           ]
//       }
//   ]
// }

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
export const authorize = (event, context, cb) => {
  console.log('Auth function invoked');
  if(event.authorizationToken) {
    // Remove 'bearer ' from token:
    console.log(context, event);
    const token = event.authorizationToken.substring(7);
    request.get(`${iss}/userinfo`, {
      headers: {Authorization: `Bearer ${token}`},
      json: true
    }, function(error, response, body) {
      console.log(body);
      // context.user = body;
      if(error) {
        cb(error);
      } else {
        cb(null, generatePolicy(body.sub, 'Allow', event.methodArn));
      }
    });
  } else {
    console.log('No authorizationToken found in the header.');
    cb('No authorizationToken found in the header.');
  }
};