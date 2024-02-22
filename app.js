// app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

require('dotenv').config();
// routes
const tripsRouter = require('./routes/api/trips');
const profilesRouter = require('./routes/api/profiles');
const net = require('net');
const server = net.createServer();
server.on('connection', (clientToProxySocket) => {
  console.log('Client Connected  To Proxy');
});
server.on('error', (err) => {
  console.log('SERVER ERROR');
  console.log(err);
});
server.on('close', () => {
  console.log('Client Disconnected');
});
server.listen(8124, () => {
  console.log('Server running at http://localhost:' + 8124);
});
// Connect Proxy
server.on('connection', (clientToProxySocket) => {
    console.log('Client Connected To Proxy');
    // We need only the data once, the starting packet
    clientToProxySocket.once('data', (data) => {
      let isTLSConnection = data.toString().indexOf('CONNECT') !== -1;
    
      //Considering Port as 80 by default 
      let serverPort = 88;
      let serverAddress;
      if (isTLSConnection) {
        // Port changed to 443, parsing the host from CONNECT 
        serverPort = 443;
        serverAddress = data.toString()
                            .split('CONNECT ')[1]
                            .split(' ')[0].split(':')[0];
      } else {
         // Parsing HOST from HTTP
         serverAddress = data.toString()
                             .split('Host: ')[1].split('\r\n')[0];
      }
      let proxyToServerSocket = net.createConnection({
        host: serverAddress,
        port: serverPort
      }, () => {
        console.log('PROXY TO SERVER SET UP');
        
        if (isTLSConnection) {
          //Send Back OK to HTTPS CONNECT Request
          clientToProxySocket.write('HTTP/1.1 200 OK\r\n\n');
        } else {
          proxyToServerSocket.write(data);
        }
        // Piping the sockets
        clientToProxySocket.pipe(proxyToServerSocket);
        proxyToServerSocket.pipe(clientToProxySocket);
        
        proxyToServerSocket.on('error', (err) => {
          console.log('PROXY TO SERVER ERROR');
          console.log(err);
        });
      });
      clientToProxySocket.on('error', err => {
        console.log('CLIENT TO PROXY ERROR');
        console.log(err);
      });
    });
  });

app.get('/api/trips', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.get('/api/profiles', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

connectDB();
app.use('/images', express.static('images'));


// cors
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use("/",tripsRouter) 
app.use("/",profilesRouter) 



const port = 3100;

app.listen(port, () => console.log(`Server running on port ${port}`));