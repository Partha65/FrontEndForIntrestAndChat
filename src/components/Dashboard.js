import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatList from './ChatList';
import RequestList from './RequestList';
import UserList from './UserList';
import { Container, Grid, Typography } from '@mui/material';
import '../styles/App.css';
import AcceptedUsers from './AcceptedUsers';

function Dashboard() {
  const [frinds, setFrinds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Token ${token}` };
    //   list of user who send reuest
      axios.get('http://localhost:8000/api/interests/list/', { headers })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    //   fetch all the user who are not in frind list
      axios.get('http://localhost:8000/api/unrequested-users/', { headers })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Accepted and who have acceted request
    axios.get('http://localhost:8000/api/accepted-users/', { headers })
      .then((response) => {
        setFrinds(response.data);
      })
      .catch((error) => {
        console.error(error);
      });  

    
    //   try {
    //     const [requestsResponse] = await Promise.all([
    //     //   axios.get('http://localhost:8000/api/chats/', { headers }),
    //       axios.get('http://localhost:8000/api/interests/list/', { headers }),
    //     //   axios.get('http://localhost:8000/api/users/', { headers })
    //     ]);
    //     console.log('reqList',requestsResponse.data)
    //     // setChats(chatsResponse.data);
    //     setRequests(requestsResponse.data);
    //     // setUsers(usersResponse.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    };

    fetchData();
  }, []);

  return (
    <Container style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <AcceptedUsers acceptedUsers= {frinds} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RequestList requests={requests} />
        </Grid>
        <Grid item xs={12} md={4}>
          <UserList users={users} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
