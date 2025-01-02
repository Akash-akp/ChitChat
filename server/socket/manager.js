const {WebSocketServer} = require('ws');
const {onMessage,onError} = require('./handler');

const startSocketServer = (port)=>{

    const wss = new WebSocketServer({port},()=>{console.log(`Websocket server is running on ws://localhost:${port}`)});

    let allSocket = [];

    wss.on('connection',(ws)=>{
        ws.on('message',(message)=>{onMessage(message,ws,allSocket)});
        ws.on('onError',(error)=>{onError(error,ws)});
    });

}

module.exports = startSocketServer;