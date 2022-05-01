const fs = require('fs');
// fs module (File System module) 파일처리와 관련된 전반적 작업을 하는 내장 모듈
const path = require('path');
// 파일과 폴더의 경로 작업을 위한 기능을 제공하는 내장 모듈

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/currenttime', function (req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
});

app.get('/', function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>'
  );
});
app.post('/store-user', function (req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');
  // 모든 운영체제에서 해당 파일의 플랫폼을 작동시키는 경로 구성

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send('<h1>Username stored</h1>');
});

app.get('/users', function (req, res) {
  const filePath = path.join(__dirname, 'data', 'users.json');

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = '<ul>';

  for (const user of existingUsers) {
    responseData += '<li>' + user + '</li>';
  }
  responseData += '</ul>';

  res.send(responseData);
});
app.listen(3000);

// const http = require('http');

// function handleRequest(request, response) {
//   if (request.url === '/currenttime') {
//     response.statusCode = 200;
//     response.end('<h1>' + new Date().toISOString() + '</h1>');
//   } else if (request.url === '/') {
//     response.statusCode = 200;
//     response.end('<h1>Hello World</h1>');
//   }
// }

// const server = http.createServer(handleRequest);

// server.listen(3000);
