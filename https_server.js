var https = require('https');

var fs = require('fs');

var https_options = {

  key: fs.readFileSync("/opt/bitnami/apache/conf/lordsforerunner.net.key"),

  cert: fs.readFileSync("/opt/bitnami/apache/conf/lordsforerunner.net.crt"),

  ca: [

          fs.readFileSync('/home/bitnami/8395.crt'),

          fs.readFileSync('/home/bitnami/9314791.crt')

       ]
};

https.createServer(options, function (req, res) {

 res.writeHead(200);

 res.end("Welcome to Node.js HTTPS Server");

}).listen(8443)