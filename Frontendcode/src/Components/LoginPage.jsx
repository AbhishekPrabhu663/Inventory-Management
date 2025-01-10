import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const fetchCredentials = async () => {
    try {
      // Replace this with your API endpoint
      const response = await fetch('http://localhost:8080/addUser/list');
      const data = await response.json();
      console.log(data);
      return data || []; // Ensure the credentials key exists
       } catch (err) {
      console.error('Error fetching credentials:', err);
      return [];
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
  
    try {
      const credentials = await fetchCredentials();
      console.log("the credentials obtained is", credentials);
  
      // Check if credentials is an array and not empty
      if (Array.isArray(credentials)) {
        const validUser = credentials.find((cred) => {
          // Use bcrypt.compareSync to compare the plaintext password with the hashed password
          return cred.userName === username && bcrypt.compareSync(password, cred.password);
        });
        
        console.log("Credentials:", credentials);
        console.log("Password entered:", password);
  
        if (validUser) {
          onLogin(); // Call the parent onLogin function
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
 
  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: '5%' }}>
      <Typography variant="h5" gutterBottom style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="src/logo/logo-svg.svg" alt="Icon" style={{ width: 150, height: 150 }} />
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          margin="dense"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Forgot Password?
        </Typography>
      </form>
    </Paper>
  );
};
 
export default LoginPage;
 