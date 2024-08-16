import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../styles/App.css';  // Import CSS

function ChatList({ chats }) {
  return (
    <Card className="card-wrapper">
      <CardContent>
        <Typography variant="h6">Your Chats</Typography>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Typography key={chat.id}>{chat.room_name}</Typography>
          ))
        ) : (
          <Typography>No active chats</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default ChatList;
