//import http library
const http = require('http');

//option 1 below
//function rqListener(req, res){
//
//}

//for every request, the rqListener function will run
//http.createServer(rqListener);

//option 2:
//createServer returns server object so save as a constant
const server = http.createServer((req, res) => {
    //console.log(req);
    console.log(req.url, req.method, req.headers)
    //process exit will run code and quit after there's been a request on the browser
    //typically don't want this since you want server to continuously be running
    //process.exit();
    res.setHeader('Content-Type', 'text/html');
    //will learn later how to pass back html
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1><body>');
    res.write('</html>');
    res.end();
})

//starts a process to not just execute code, but keep running to continue listening for requests
//using port 3000, default port 80, which we would want to use during production but not during local development)
//hostname is default to local (normally server this code is running on)
server.listen(3000);

//go to local:3000 on browser, nothing will happen since we haven't given a response
//but in terminal will output on the console a log of the request

//above is called an Event Loop where it keeps on running as long as there are event listeners registered
//core node application is managed by this event loop