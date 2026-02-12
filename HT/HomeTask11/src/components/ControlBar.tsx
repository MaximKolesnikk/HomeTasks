import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link'; 

interface ControlBarProps {
  isAuthenticated: boolean;
}

const ControlBar: React.FC<ControlBarProps> = ({ isAuthenticated }) => {
  const router = useRouter(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login'); 
    window.location.reload(); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </Typography>
        {isAuthenticated ? (
          <Box>
            <Button color="inherit" component={Link} href="/my-exhibits">
              My Exhibits
            </Button>
            <Button color="inherit" component={Link} href="/new-post">
              New Post
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ControlBar;