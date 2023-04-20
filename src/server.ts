const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

interface Test {
    test: string,
    id: number
}

const abc: Test = {
    test: "Marvelous or Mishegas",
    id: 5
}

// @ts-ignore
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`${abc.test}! ${abc.id}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});