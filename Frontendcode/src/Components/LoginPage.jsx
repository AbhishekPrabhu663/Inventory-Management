import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { TextField, Button, Paper, Typography } from '@mui/material';
import bcrypt from 'bcryptjs';

const LoginPage = ({ onLogin }) => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let inactivityTimer = null;

  const fetchCredentials = async () => {
    try {
      const response = await fetch('http://localhost:8080/addUser/list');
      const data = await response.json();
      return data || [];
    } catch (err) {
      console.error('Error fetching credentials:', err);
      return [];
    }
  };

  // Function to handle user inactivity and log out
  const handleInactivity = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page
      alert('You have been logged out due to inactivity.');
    }
  };

  // Reset inactivity timer whenever there is user interaction
  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer); // Clear existing timer

    // Set inactivity timeout only if user is logged in
    if (isLoggedIn) {
      inactivityTimer = setTimeout(handleInactivity, 2 * 60 * 1000); // Set 2 minutes inactivity timeout
    }
  };

  // Add event listeners for activity tracking
  useEffect(() => {
    if (isLoggedIn) {
      const events = ['mousemove', 'keydown', 'scroll', 'click'];
      events.forEach(event => window.addEventListener(event, resetInactivityTimer));

      // Initialize inactivity timer
      resetInactivityTimer();

      // Cleanup event listeners when component is unmounted or when logged out
      return () => {
        events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
        if (inactivityTimer) clearTimeout(inactivityTimer);
      };
    }
  }, [isLoggedIn]); // Effect will re-run when login state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      const credentials = await fetchCredentials();
      if (Array.isArray(credentials)) {
        const validUser = credentials.find((cred) => {
          return cred.userId === userid && bcrypt.compareSync(password, cred.password);
        });

        if (validUser) {
          onLogin(); // Call the parent onLogin function
          setIsLoggedIn(true); // Set user as logged in
          navigate('/home'); // Navigate to the home page
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred while fetching credentials');
    }
  };

  // Function to handle Forgot Password link click
  const handleForgotPasswordClick = () => {
    navigate('/forgot-password', { state: { userid } }); // Passing username to ForgotPasswordPage
  };

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: '5%' }}>
      <Typography variant="h5" gutterBottom style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="src/logo/logo-svg.svg" alt="Icon" style={{ width: 150, height: 150 }} />
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="UserId"
          margin="dense"
          variant="outlined"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Typography />
        <Typography variant="body2" align="center" style={{ marginTop: 5 }}>
          <span 
            style={{ textDecoration: 'none', cursor: 'pointer', color: 'blue' }}
            onClick={handleForgotPasswordClick}  // Trigger navigation to Forgot Password page
          >
            Forgot Password?
          </span>
        </Typography>
      </form>
    </Paper>
  );
};

export default LoginPage;

