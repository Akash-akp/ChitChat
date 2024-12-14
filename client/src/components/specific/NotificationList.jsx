import React, { lazy, Suspense } from 'react';

// Lazy loading the Chat component
const Notification = lazy(() => import('./Notification'));

const NotificationList = ({ notification = [], notificationParamId }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading notification...</div>}>
        {notification.map((data) => (
          <Notification 
            key={data.Id} 
            data={data.name} 
            Id={data.Id} 
            mode = {data.mode}
            notificationParamId={notificationParamId} 
          />
        ))}
      </Suspense>
    </div>
  );
};

export default NotificationList;