import React, { lazy, Suspense } from 'react';

// Lazy loading the Chat component
const Chat = lazy(() => import('./Chat'));

const ChatList = ({ chats = [], chatParamId }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading chats...</div>}>
        {chats.map((data) => (
          <Chat 
            key={data.Id} // Ensure a unique key is provided
            data={data.name} 
            Id={data.Id} 
            chatParamId={chatParamId} 
          />
        ))}
      </Suspense>
    </div>
  );
};

export default ChatList;