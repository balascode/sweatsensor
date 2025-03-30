// Create a new component called BackgroundBubbles.jsx
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const BackgroundBubbles = () => {
  const [offset, setOffset] = useState(0);
  
  const handleScroll = () => setOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ 
      position: 'fixed', // Change to fixed from absolute to cover whole app
      top: 0,
      left: 0,
      width: '100%', 
      height: '100%', 
      overflow: 'hidden', 
      zIndex: 0,
      pointerEvents: 'none' // Important to allow interaction with elements below
    }}>
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            animation: `float ${Math.random() * 10 + 10}s infinite linear`,
            transform: `translateY(${offset * Math.random() * 0.5}px)`,
            '@keyframes float': {
              '0%': { transform: 'translateY(0) translateX(0)' },
              '50%': { transform: 'translateY(20px) translateX(10px)' },
              '100%': { transform: 'translateY(0) translateX(0)' }
            }
          }}
        />
      ))}
    </Box>
  );
};

export default BackgroundBubbles;