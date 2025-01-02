const onMessage = (message,ws,allSocket) =>{
    const messageObj = JSON.parse(message);
    if(messageObj.type == 'join'){
        let foundSocket = allSocket.find(socket=>socket.userId == messageObj.userId)
        if(foundSocket){
            foundSocket.userId = messageObj.userId;
            foundSocket.ws = ws;
            ws.send(JSON.stringify({type:"join",msg:"You have already joined"}));
            return;
        }
        allSocket.push({userId: messageObj.userId, ws});
        ws.send(JSON.stringify({type:"join",msg:"You are joined"}));
    }else if(messageObj.type == 'message'){
        console.log(allSocket)
        const receiverId = messageObj.receiverId;
        const receiverSocket = allSocket.find(socket=>socket.userId == receiverId)?.ws;
        if(receiverSocket){
            console.log("found receiver");
            receiverSocket.send(JSON.stringify({type:"message",senderId:messageObj.senderId,receiverId:messageObj.receiverId,message:messageObj.message,createdAt:messageObj.createdAt}));
        }
        const senderId = messageObj.senderId;
        const senderSocket = allSocket.find(socket=>socket.userId == senderId)?.ws;
        if(senderSocket){
            console.log("found sender");
            senderSocket.send(JSON.stringify({type:"message",senderId:messageObj.senderId,receiverId:messageObj.receiverId,message:messageObj.message,createdAt:messageObj.createdAt}));
        }
    }
}

const onError = (error,ws)=>{
    console.log(error);
    ws.close();
}

module.exports = {onMessage, onError};