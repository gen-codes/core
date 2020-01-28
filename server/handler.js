import tgzFiles from "./utils/tgzFiles";
const Registry = require('npm-registry-client');
const request = require('request');
const iss = process.env.AUTH0_DOMAIN;
// 
const client = new Registry();
export const publish = async (event, context) => {
  const principalId = event.requestContext.authorizer.principalId;
  const access = "public";
  const auth = {
    token: process.env.NPM_AUTH_TOKEN
  };
  const {userData, authError} = await new Promise((resolve, reject) => request.get(`${iss}/api/v2/users/${principalId}`, {
    headers: {Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`},
    json: true
  }, function(authError, response, body) {
      resolve({userData: body, authError});
  }));
  if(authError){
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  }
  const githubId = userData.nickname;
  console.log(userData);
  const githubOrgs = userData.user_metadata.github_orgs.map(org => org.toLowerCase());
  // event.orgs.map(org => org.toLowerCase());
  const files = JSON.parse(event.body);
  let pack = files["gen.module.json"];
  if(!pack) throw new Error('No gen.module.json in files object');
  const registry = "https://registry.npmjs.com";
  let name = "";
  if(pack.name.startsWith("@")){
    const userGroupName = pack.name.split("/")[0].replace("@", "").toLowerCase();
    console.log(userGroupName);
    if(githubOrgs.includes(userGroupName)){
      if(userGroupName === "gen-codes"){
        name = `@gen-codes-registry/${pack.name.replace("@gen-codes/", "").toLowerCase()}`;
      }else{
        name = `@gen-codes-registry/${pack.name.replace("@", "").replace("/", "_").toLowerCase()}`;
      }
    }else if(userGroupName === githubId){
      name = `@gen-codes-registry/${pack.name.replace("@", "").replace("/", "_").toLowerCase()}`;
    }else{
      return {
        statusCode: 500,
        body: JSON.stringify({error: "You are not the owner of "+userGroupName})
      };
    }
  }else{
    name = `@gen-codes-registry/${githubId}_${pack.name}`;

  }
  if(!pack.dependencies) {
    pack.dependencies = {};
  }
  if(pack.modules) {
    for(let moduleName in pack.modules) {
      const version = pack.modules[moduleName];
      if(moduleName.startsWith("@")){
        moduleName = moduleName.replace("@", "").replace("/", "_");
      }
      pack.dependencies[`@gen-codes-registry/${moduleName}`] = version;
    }
  }
  const body = tgzFiles(files, {prefix: 'package'});
  const metadata = {
    name,
    version: pack.version,
    dependencies: pack.dependencies
  };
  console.log(metadata);
  const {error, response} = await new Promise((resolve) => client.publish(
    `${registry}/${encodeURIComponent(name)}`,
    {metadata, access, auth, body},
    (err, res) => {
      resolve({error: err, response: res});
    }
  ));
  if(error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  };
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
export const search = async (event, context) => {
  return {
    statusCode: 200,
    body: "['searching']"
  };
};
// const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
//   setTimeout(() => {
//     resolve(`${rest.copy} (with a delay)`);
//   }, time * 1000)
// );
