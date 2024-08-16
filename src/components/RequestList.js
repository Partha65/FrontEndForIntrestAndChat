import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/App.css';  // Import CSS

function RequestList({ requests }) {
  const handleRequest = async (requestId, action) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:8000/api/interests/${requestId}/status/`,
        { "status": action},
        { headers: { Authorization: `Token ${token}` } }
      );
      alert(`Request ${action}ed successfully!`);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(`Failed to ${action} request`);
    }
  };

  return (
    <Card className="card-wrapper">
      <CardContent >
        <Typography variant="h6">Requests Received</Typography>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} style={{ marginBottom: '10px' }}>
              <Typography>{request.sender.username}</Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
                onClick={() => handleRequest(request.id, 'accepted')}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRequest(request.id, 'rejected')}
              >
                Decline
              </Button>
            </div>
          ))
        ) : (
          <Typography>No requests received</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default RequestList;
