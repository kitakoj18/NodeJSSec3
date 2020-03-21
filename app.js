//refer to nodeServer.js for more basics

const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    //if url is /message and the method is POST (as above), redirect to /
    if(url === '/message' && method === 'POST'){
        //get information from the request
        //streaming and buffing allows us to work with chunks of data as it's coming in
        //listen to data event, which will be fired whenever a new chunk is ready to be read:
        const body = [];
        //this is chunks of data that's being parsed through, but cannot work with this data yet
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        //will be fired when done parsing through data
        //now, we can work with the data that's being passed through this buffer object
        return req.on('end', () => {
            //parsedBody looks like "message=user_input" ; split below on parsedBody to get user_input
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            //sync: syncronous, which will block execution of next line of code until this line is run
            //fs.writeFileSync('message.txt', message);
            
            //with larger text files, use writeFile:
            fs.writeFile('message.txt', message, (err) => {
                //redirect user to /
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        })
        
    } 

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1><body>');
    res.write('</html>');
    res.end();
})

server.listen(3000);