const core = require('@actions/core');
const github = require('@actions/github');
const querystring = require('querystring')
const https = require('https')

try {
  // `who-to-greet` input defined in action metadata file
  console.log("UPDATED")
  const weburl = core.getInput('website_url');
  const appguid = core.getInput('application_guid');
  const appid = core.getInput('application_id');
  console.log(`Testing Website: ${weburl}!`);

  var postData = JSON.stringify({
        "Appguid": appguid,
        "ApplicationID": appid,
        "AuthType": "O365",
        "AuthProvider": "O365",
        "UserName": "someome@somewhere.com",
        "UserPassword": "someone",
        "URL": weburl,
        "OS": "windows",
        "Browser": "chrome",
        "OSVersion": "Win10",
        "BrowserVersion": "10",
        "AuditCategory": "LightHouse",
        "CreatedDatetime": "2020-10-14T07:23:50.929Z",
        "CreatedBy": "cicdaction@sofy.ai",
        "TestRunStatus": "submitted",
        "TestStartDateTime": "2020-10-14T07:23:50.929Z",
        "TestEndDateTime": "",
        "WebTestRunType": [
            "ALL"
        ],
        "NodesToTest": 10
    });

  var options = {
        hostname: 'api.sofy.ai',
        port: 443,
        path: '/api/WebTests/Create',
        method: 'POST',
        headers: {
             
             'Content-Length': postData.length,
             'Connection' : 'keep-alive',
             'Pragma' : 'no-cache',
             'Cache-Control' : 'no-cache',
             'Accept' : 'application/json, text/plain, */*',
             'SofyAuth' : "67935C5B-A009-4DC8-9EC6-2F8E9D58E6DC",
             'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36 OPR/71.0.3770.228',
             'Content-Type': 'application/json',
             'Origin' : 'https://portal-sofy-test.azurewebsites.net',
             'Sec-Fetch-Site' : 'cross-site',
             'Sec-Fetch-Mode' : 'cors',
             'Sec-Fetch-Dest' : 'empty',
           }
      };
    var req = https.request(options, (res) => {
        console.log(res);
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
        process.stdout.write(d);
        });
    });
      
      req.on('error', (e) => {
        console.error(e);
      });
      
      req.write(postData);
      req.end();


  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

} catch (error) {
  core.setFailed(error.message);
}