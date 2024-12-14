import React, { lazy, Suspense } from 'react';

// Lazy loading the Chat component
const Chat = lazy(() => import('./Chat'));

const ChatList = ({ chats = [], chatParamId ,mode }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading chats...</div>}>
        {chats.map((data) => (
          <Chat 
            key={data.Id} 
            data={data.name} 
            Id={data.Id}
            mode = {data.mode} 
            chatParamId={chatParamId} 
          />
        ))}
      </Suspense>
    </div>
  );
};

export default ChatList;