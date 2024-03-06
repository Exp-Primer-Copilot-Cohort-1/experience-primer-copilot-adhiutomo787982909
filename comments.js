// Create web server
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = require('./comments');

// 2. Create an HTTP server to handle responses
http.createServer(function (request, response) {
    // 3. Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // 4. Read the requested file content from file system
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            // Write the content of the file to response body
            response.write(data.toString());
        }

        // Send the response body
        response.end();
    });

}).listen(8081);

// Console will print the message
console.log('Server running at http://