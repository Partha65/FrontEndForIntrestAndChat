import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/App.css';  // Import CSS

function UserList({ users }) {
  const sendRequest = async (receiverId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:8000/api/interests/',
        { receiver: receiverId },
        { headers: { Authorization: `Token ${token}` } }
      );
      alert('Interest request sent!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Failed to send request');
    }
  };

  return (
    <Card className="card-wrapper">
      <CardContent className="card-content">
        <Typography variant="h6">All Users</Typography>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} style={{ marginBottom: '10px' }}>
              <Typography>{user.username}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => sendRequest(user.id)}
              >
                Send Interest
              </Button>
            </div>
          ))
        ) : (
          <Typography>No users available</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default UserList;
