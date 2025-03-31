import React, { useState, useEffect} from 'react';
import Dashboard from '../components/Dashboard/dashboard';
import { io } from 'socket.io-client';

function DashboardPage({sweatData}) {
    //   const [sweatData, setSweatData] = useState({
    //     sodium: 0,
    //     glucose: 0,
    //     hydration: 0,
    //     lactate: 0,
    //   });
    // const socket = io('https://sweatsensorbackend.onrender.com/', {
    //     reconnection: true,
    //     reconnectionAttempts: Infinity,
    //     reconnectionDelay: 1000,
    //     transports: ['websocket'],
    //   });
    
    //   useEffect(() => {
    //     console.log('Connecting to socket at:', socket.io.uri);
    
    //     socket.on('connect', () => {
    //       console.log('Socket connected successfully at:', socket.io.uri);
    //     });
    
    //     socket.on('sweatData', (data) => {
    //       console.log('Received sweat data:', data);
    //       setSweatData(data);
    //     });
    
    //     socket.on('disconnect', (reason) => {
    //       console.log('Socket disconnected due to:', reason);
    //     });
    
    //     socket.on('reconnect', (attempt) => {
    //       console.log('Reconnected after', attempt, 'attempts');
    //     });
    
    //     socket.on('connect_error', (error) => {
    //       console.log('Connection error:', error.message);
    //     });
    
    //     return () => {
    //       socket.off('sweatData');
    //       socket.off('connect');
    //       socket.off('disconnect');
    //       socket.off('reconnect');
    //       socket.off('connect_error');
    //     };
    //   }, []);
    return (
    <Dashboard sweatData={sweatData}/>
    );
} 

export default DashboardPage;
