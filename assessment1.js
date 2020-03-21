const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if(url==='/'){

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment Page</title></head>');
        res.write('<body><h1>This is the assignment page!</h1><body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/users'){

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body><ul><li>Koji</li><li>Thai</li><li>Mishen</li><li>Kacie</li><body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/create-user' && method==='POST'){

        const body = []
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', ()=> {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1]
            console.log(user)
            return res.end();
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }

})

server.listen(3000);