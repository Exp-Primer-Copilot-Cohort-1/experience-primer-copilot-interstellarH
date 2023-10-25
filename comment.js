// Create web server
// 1. Create a web server
// 2. Read the file
// 3. Send the file to the client
// 4. Handle errors
// 5. Listen to the port

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // 1. Create a web server
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    // 2. Read the file
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end(); // return to exit the function
  }
  if (url === '/message' && method === 'POST') {
    // 3. Send the file to the client
    // 3.1. Write the file
    const body = [];
    // 3.2. Register an event listener
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    // 3.3. Register an event listener
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      // 3.4. Write the file
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (error) => {
        // 4. Handle errors
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  // 5. Listen to the port
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);