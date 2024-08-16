import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const AcceptedUsers = ({acceptedUsers}) => {
//   const [acceptedUsers, setAcceptedUsers] = useState([]);
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAcceptedUsers = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const response = await axios.get('http://localhost:8000/api/accepted-users/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAcceptedUsers(response.data);
//       } catch (error) {
//         console.error('Failed to fetch accepted users:', error);
//       }
//     };

//     fetchAcceptedUsers();
//   }, []);

  const handleChat = (userId) => {
    // Navigate to chat with the specific user
    navigate(`/chat/${userId}`);
  };

  return (
    <Card className="card-wrapper">
      <CardContent>
        <Typography variant="h6">Accepted Users</Typography>
        {acceptedUsers.length > 0 ? (
          acceptedUsers.map((user) => (
            <div key={user.id} style={{ marginBottom: '10px' }}>
              <Typography>{user.username}</Typography>
              <Link to={`/chat/${user.id}`}>
              Chat
              </Link>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => handleChat(user.id)}
              >
                Message
              </Button> */}
            </div>
          ))
        ) : (
          <Typography>No users available</Typography>
        )}
      </CardContent>
    </Card>

    // <div className="accepted-users">
    //   <h2>Accepted Users</h2>
    //   <ul>
    //     {acceptedUsers.map((user) => (
    //       <li key={user.id}>
    //         <span>{user.username}</span>
    //         <button onClick={() => handleChat(user.id)}>Chat</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default AcceptedUsers;
