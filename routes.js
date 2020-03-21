const fs = require('fs')

function requestHandler(req, res){

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
        //return will execute the code synchronously so that it doesn't run setHeader('Content-type...) below
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            //sync: syncronous, which will block execution of next line of code until this line is run
            //fs.writeFileSync('message.txt', message);
            //with larger text files, use writeFile because following lines of code won't be executed and 
            //also, new incoming requests of other users would not be handled until this file operation is finished:
            //callback function receives error object, which will be null if no error occurs
            //if error occurs, can handle in some sort of manner in the function
            //this callback function is another event listener, and will execute once it's done writing the txt file
            fs.writeFile('message.txt', message, (err) => {
                //redirect user to /
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        })
        
    } 
    
    //this code is ignored due to conditions above
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1><body>');
    res.write('</html>');
    res.end();

}

//export function so that app2.js can import it
//module.exports = requestHandler; 

//do not need to execute this code first to export; when run app2, will automatically grab the export(s) from this file

//can export multiple things at once by putting them in an object
//in app2, grab values by calling them how it's typically done with objects e.g. routes['handler']
module.exports = {handler: requestHandler, someText: 'Some hard text'}