const express = require('express')
const app = express()
app.set( 'port', process.env.PORT || 3001 );

app.get('/', function (req, res) {
  
    var JSONheader = JSON.stringify(req.headers, ['x-forwarded-for', 'user-agent', 'accept-language']);

    var regExp = /\(([^)]+)\)/;
    var extractValues = regExp.exec(JSONheader);
    var userOS = (extractValues[1]);
    
    var JSONobject = JSON.parse(JSONheader);
  
    JSONobject['ipaddress'] = JSONobject['x-forwarded-for'];
    JSONobject['language'] = JSONobject['accept-language'];
    JSONobject['software'] = JSONobject['user-agent'];
    
    delete JSONobject['x-forwarded-for'];
    delete JSONobject['accept-language'];
    delete JSONobject['user-agent'];
    
    JSONobject.language = JSONobject['language'].split(',')[0];
    JSONobject.software = userOS;
    

    res.send(JSON.stringify(JSONobject));
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port!')
})