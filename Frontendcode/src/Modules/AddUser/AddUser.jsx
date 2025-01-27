import { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import bcrypt from 'bcryptjs';

const AddUser = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRole, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to generate a unique userId
  const generateUserId = (userName) => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random number between 1000 and 9999

    // Combine the random number with the username (or any other logic) to ensure uniqueness
    return `${userName}${randomNumber}`;
  };

  useEffect(() => {
    // If username is set, generate the userId automatically
    if (userName) {
      setUserId(generateUserId(userName));
    }
  }, [userName]); // Re-run when userName changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (userName && password && userRole && userId) {
      try {
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10); 
        const hashedConfirmPassword=bcrypt.hashSync(password, 10);
        const requestBody = {
          userName,
          password: hashedPassword,
          confirmPassword: hashedConfirmPassword,
          userRole,
          userId, // Include the generated userId
        };

        const response = await fetch('http://localhost:8080/addUser/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage('User added successfully!');
          setError('');
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to add user');
        }
      } catch (error) {
        setError('An error occurred. Please try again later.');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom align="center">
          Add User Credentials
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            value={userName}
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
          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          {/* Display generated userId */}
          <TextField
            fullWidth
            label="User Id"
            margin="normal"
            variant="outlined"
            value={userId}
            disabled // Disable this field as it's auto-generated
          />

          {/* Role selection dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={userRole}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>

          {error && <Typography color="error" align="center">{error}</Typography>}
          {successMessage && <Typography color="primary" align="center">{successMessage}</Typography>}
          
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            Save Details
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AddUser;
