const core = require('@actions/core');
const github = require('@actions/github');
const querystring = require('querystring')
const https = require('https')

try {
  // `who-to-greet` input defined in action metadata file
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
        path: '/api/WebTests/Create',
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
             'Content-Length': postData.length,
             'SofyAuth' : "67935C5B-A009-4DC8-9EC6-2F8E9D58E6DC"
           }
      };
    var req = https.request(options, (res) => {
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


  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}