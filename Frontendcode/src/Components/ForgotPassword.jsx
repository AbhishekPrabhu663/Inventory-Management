import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing

const ForgotPasswordPage = () => {
  const { state } = useLocation();  // Using useLocation to access passed state (userId)
  const navigate = useNavigate();
  
  // Set userId from state passed to the page
  const [userId, setUserId] = useState(state ? state.userid : ''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch the user to verify the userId and get further details (like their stored password hash)
  useEffect(() => {
    console.log("the userid that is being sent to the api is ",userId )
    if (userId) {
      console.log("the userId is", userId);
      const fetchUserData = async () => {
        try {
          // Use template literal to insert userId into the URL
          const response = await fetch(`http://localhost:8080/addUser/getByUserId/${userId}`);
  
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
  
          const data = await response.json();
          console.log("The new API data fetched results are as follows", data);
  
          // Assuming the data returned is an object with user details
          if (data) {
            setUserId(data.userId);  // For example, set the userId or any other fields you need
            console.log("the user id is ",data.userId);
            // Set other user data if needed
            // setSomeOtherState(userDataWithoutPasswords.someField);
  
          } else {
            setError('User ID not found');
          }
        } catch (err) {
          console.error('Error fetching user list:', err);
          setError('Failed to fetch user data. Please try again later.');
        }
      };
  
      fetchUserData();
    }
  }, [userId]);  // Run when userId changes


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation checks
    if (!userId || !password || !confirmPassword) {
      setError('Please fill all the fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Encrypt the password using bcrypt
      const salt = bcrypt.genSaltSync(10);  // Generate salt with strength 10
      const hashedPassword = bcrypt.hashSync(password, salt);  // Hash the password with the salt
    
      // Send the request to reset the password with the encrypted password
      const response = await fetch(`http://localhost:8080/addUser/resetPassword/${userId}`, {
        method: 'PUT',  // Changed to PUT for password reset
        headers: {
          'Content-Type': 'text/plain',  // Use text/plain to send raw text
        },
        body: hashedPassword  // Send the hashed password directly as plain text
      });
    
      const data = await response.json();
      if (response.ok) {
        setMessage('Password has been successfully reset');
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to reset password. Please try again later.');
      console.error(err);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: '5%' }}>
      <Typography variant="h5" gutterBottom align="center">
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="UserId"
          margin="dense"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)} // Allow updating the userId (it may change if an invalid ID was entered)
          required
          disabled
        />
        <TextField
          fullWidth
          label="New Password"
          margin="dense"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          margin="dense"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {message && <Typography color="primary">{message}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
          Reset Password
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: 5 }}>
          Remember your password?{' '}
          <Button color="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Typography>
      </form>
    </Paper>
  );
};

export default ForgotPasswordPage;
