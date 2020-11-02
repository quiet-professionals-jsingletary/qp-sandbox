const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const NodeRSA = require('node-rsa');
/*
const keyData = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIEpAIBAAKCAQEAvfh8AQBjmrFKVIgEZhIqgQMFgCP2q4VQe+UgftRns7HEuQa5\n' +
'4LnfTDtxhuFZNYIS0mx5tER/1h+wIG94mKcLwtr7Mz3wLkijPDi8TUFMHtsraZfR\n' +
'4qilblAhol3ywZ2ZTNVXv0UaHP/zXNe0x82/M3BQlSCsXtT95s6SrYU+ttBwk5ia\n' +
'XjeL5/HEpTvwrwKXYU6vuSWKvfCvCb6iuC/zOAON5Y0n9e5sQ9kSw1gBZ/IoeF19\n' +
'WyxxYx1upbihRLFBxdgJo7PVfoSyKPvqC60rDazMM7NGeyppP8dQ7hjp7cHKBysZ\n' +
'A98CHFQO/6gr2VSFckSjB7RL+E0h1mQ+T5usUQIDAQABAoIBACEXX8Js5uzTZTdE\n' +
'Wj/Neknu1M51dUp7doGecAKnzUin9rSkT0yuFA+bazMrnfaMKestqiWUqRALhQqh\n' +
'YEh3EL1ol8ldSLFHRef/mg17Cl91niJOp+jrp6WHn9RAuUCwyztvDlHrH5ldnG7X\n' +
'xE3psRysu9y+TEhYocHKyhIf28TMTP3lpbHq+FlxLD9xPXzML+nUcuzVH7yUIcf5\n' +
'8Kw4O2+pHHOx2fz97FC/PwpdVxa1mUHUbpdOdAIis+SScIpk9Taw3JZx2uaLbxWV\n' +
'OxHswbfi+2pzabgjp+OnKxo0ttIW6OxY5aYsi++y6evNNaNzwEmQQFxvIa7cvQ7y\n' +
'NoyADgECgYEA9uic+ZUSkqMeTrQyb7sd8+9nuFA+tN8vVttyNKUMoL09xHrno4HV\n' +
'eXtLQVQ71aJsV0u67TehKuZa0imVnwhGwDAPFvYgG6fXI0JbTUAl35gBSVMwr8p7\n' +
'sa8uM+H1/U+9SDDtDIAFMCBiP0wjkzsy6Xoc/ewHhzr0R0JVz7vWT9kCgYEAxPcq\n' +
'6I3tqyHPNPxlPp6kTv5FwtFPUlVt9iNFmSvf4GKhor0HKVh45YmvXsNUHECp4G+a\n' +
'HzbOS6059Gfm+bIoI1HWJlwqY7gJ0lTcKGKVvodTLHcM/We6BLif9V6pzt03Y3IZ\n' +
'DFtCALYvTuw6HS1wR+RouRh1BKZrbFiDRpm47TkCgYAjs1afL9LTqQpEzwFL7n5S\n' +
'OxeAKvomJO8vW+OTgRnmU/aOZkb/+VHoks86zvcn2KhZpvWMPzLqhQw0vxaHPCce\n' +
'utQzubrCxO3yhzG0ZcYUImJtO74abOidtHq1vcJXsiPoQErGN+yIHOaXyGaMb07Z\n' +
'O3LdtDcSco/HjevicYJ3YQKBgQCxFznxFYrXDvLqRPQStTgt/dhjLSYQdNcFMvlk\n' +
'mloTuRpy41oJBo7MclrG7QA21rzmGfGMlw4sZHdzE+hMIK6N8wqEOuGx/sp13e6E\n' +
'MP9J6woRNIjtXdGWZRkM2Cv83lDqjK+QuIxDb4phf2tQyIXnXan6oc60e5yiMYL2\n' +
'e0gVoQKBgQCSQTlPyNyWAgliWHdFFY0NKNUFE7T6BenLXOou2JjXb5yhF5SVlmqp\n' +
'OnzWSEBykcG3SSBN3czqi1CBD6RtJC6KdCxhUf53kTeIb9QXaQsr8YcKyEK8deYe\n' +
'x6Ia9Ne0HNlmoU5e4OFibUDFJ6xr48vH36CgYnhOa6lUe+aRYdAx1g==\n' +
'-----END RSA PRIVATE KEY-----');
*/

const keyData = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIEpAIBAAKCAQEAzWJEgVPNXeMVOGNxNbiR1mTw3t1yDQRn7YQ5B3Svuii3A1+8\n' +
'7CAl0tUIJfc3WaTg8l1Rwskg7p+rnmLIDnRLUak8BiJBobnm6cDSmhWFgNXikew/\n' +
'YY/TlLXN3tCEz0GmyJ9jQHRLYBa/PEndUVqav4QfAPi1ChEaq2GtGuhX8qZEQfgg\n' +
'sLQCvJ/lM3n/k0DbcyZ8Gkgg7eREoHO7NE3HDVS1OrnAMIAj6AsqYguN7gol822I\n' +
'6aur2L7mF4AW2/ylWpsPtgX6fgzjo6FmGRSCrkfkevFZxbNd2yXUN8jnF4TW5H2i\n' +
'Tc9YEHKjDEw2osrjGC3tpaHH4E02pCgC5kgNswIDAQABAoIBAAS0NHd10OVOlyTU\n' +
'ejpNwOFVLIMeNUeBC1RQS/IUxRWRayejoLMTxWn/wREFiXn/IbvLUV0RuDRe6dJV\n' +
'1tkl5re3FY3aaQBoPpap+OjYh1c9DtRiwczdO25Tf6STyAbrLQO5Ss+mGjfYLYcW\n' +
'9f+wAI1UXFVsXNEfNSopsYpFOgZvp+x3MJHVHyxDD/xlIDNsccKsLaSp+CxoPFxd\n' +
'9vwjJN+ZZNyhlC/rfbHgeo/HJFtB8PZzF+nF01s89kdi8QBdw6lvYMiOtq6IlZRr\n' +
'7VpopTq21Xxh9rXCPYwwd/34Ap/CjXrxesbNfdXtbPZK008vusWm5hEdzhWwchhq\n' +
'jbS1qOECgYEA7D7ZVgIAF5dVW+S9Awpe8Qz0zcOVTVou3bf6SMyydtpOCgjv8t7z\n' +
'vXiGHOmDT6p3l8QzzGUIs8r5QYh9CclqXYtjgE/hojxOLyofFurcxI2uYDnXNkvC\n' +
'IWD0AuA7NIZaEP9yaQZRxMsNp2sdTKPJzSsDZcWxPZTMtpgCPsGhbDECgYEA3o7I\n' +
'qA5vhp/g6/rOn1GvDzf8EtI+tSeCGujCjdipS/qyrZPznlTYBVQH9mcECrBVoWPq\n' +
'tWCxyPhmC4NgcqttRAX1LYM4xTKw3vD67bzM3iFFZl7fSDFLk7omMG+Z4FB/U4ol\n' +
'Xbq9FSk1auDV9A6ElsyljCLRdxvTxErM4yOQsyMCgYEAkpZ40tZQ6lJ7o5Zt9aoE\n' +
'uTuZ1udKCAIyXF8hDPT+s6LHk5ByGtheky1qwhve35rdtC0JGwWB/dWvDgu70kvJ\n' +
'FRw9dEucrMcQmFFhkx3OOKPVFF4vfMBLR9zZ68Lo2bGXxz5J5oMGT77SzRQ4zOpA\n' +
'eG79H7QoQxbGY3I0ym3pVLECgYEA09jYOdhb4qrnH9lCuza2y2bAJG5K0IeF+fVb\n' +
'1EfLhw5g7Icr26fpZNEDL1IJ796/8/s3HGWpdaK1B/qLYTu6q4h8RFFnRZal8+Ex\n' +
'CgGwhTToabSfF4oM5dbIqUxiDbqyKKQUQ28Qs0bhmRXhswnqvdyZLJasCpPLdUq6\n' +
'Uu+0uj8CgYABmSfOhv7e50y3UBEh3de7IBqHPwsCKTDn5KPKGnKUB6fZfCForXPB\n' +
'UULVxHkfspHj8WXSCrvbvGR6Z8iuILfvgU8EDbQekUmPdzoV1IpEZxyQWaaChnzj\n' +
'lGbxzxaxp7mt+pq5b9xYnUpw7dnXvSZTYrLsDcDbVn67+rS5zXEwvQ==\n' +
'-----END RSA PRIVATE KEY-----');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('venntel_integration'));

app.get('/venntel_integration/search', async (request, response) => {
  //console.log("inside venntel integraion");
  var theQuery = JSON.parse(request.query.data);
  //console.log(JSON.stringify(theQuery));
  //console.log(request.query.data);
  const url = "https://staging-bs-api.venntel.com/v1.5/securityToken";
  
  const headers = {'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': apiKey 
  };
  //console.log(url);
  const fetch_response = await fetch(url, {method: 'GET', headers: headers});
  
  const json = await fetch_response.json();
  token = json.tempSecurityEncryptedToken;
  keyData.setOptions({encryptionScheme: 'pkcs1'});
  
  var decrypted = keyData.decrypt(token, 'utf8');
  //console.log(decrypted);

  //var payload = request.query.data;
  //console.log(JSON.stringify(payload));

  searchURL = "https://staging-bs-api.venntel.com/v1.5/locationData/search";
  theHeaders = {        
    'Content-Type': "application/json",
    'Accept': "application/json",
    'Authorization': apiKey,
    'TempSecurityToken': decrypted
  };
  
  var fetch_response1 = await fetch(searchURL, {method: 'POST', headers: theHeaders, body: JSON.stringify(theQuery)});
  //console.log(fetch_response1);

  const json1 = await fetch_response1.json();
  response.json(json1);
});

app.get('/recfuture/:theparams', async (request, response) => {
  //console.log(request.params);
  /* const latlon = request.params.latlon.split(',');
  console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);
  const api_key = process.env.API_KEY;
  const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  }; */
  //response.json(data);
});

app.get('/info', async (request, response) => {
  const url = "https://staging-bs-api.venntel.com/v1.5/securityToken";
  
  const headers = {'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'cd1c0531-7710-46f9-b6f8-e636065016e9'
    };
  //console.log(url);
  const fetch_response = await fetch(url, {method: 'GET', headers: headers});
  
  const json = await fetch_response.json();
  token = json.tempSecurityEncryptedToken;
  keyData.setOptions({encryptionScheme: 'pkcs1'});
  
  //const encrypted = key.encrypt(keyData, 'base64');
  //console.log(encrypted);
  
  var decrypted = keyData.decrypt(token, 'utf8');

  var payload = { 
    'startDate' : '2020-03-20T00:00:00Z',
    'endDate' : '2020-03-25T00:00:00Z',
    'registrationIDs': [{
        'registrationID': 'ff51aefb-ab54-3274-8d59-226f66203c66'
        }]
  };
  
  searchURL = "https://staging-bs-api.venntel.com/v1.5/locationData/search";
  theHeaders = {        
    'Content-Type': "application/json",
    'Accept': "application/json",
    'Authorization': "cd1c0531-7710-46f9-b6f8-e636065016e9",
    'TempSecurityToken': decrypted
  };
  var fetch_response1 = await fetch(searchURL, {method: 'POST', headers: theHeaders, body: JSON.stringify(payload)});
  
  const json1 = await fetch_response1.json();

  //var regids = json1.registrationIDs;
  
  response.json(json1);

});
