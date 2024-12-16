import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, CircularProgress, Box, Button } from '@mui/material';
import axios from 'axios';

export const SearchPerson = () => {
  const [firstName, setFirstName] = useState(''); // First Name input state
  const [lastName, setLastName] = useState('');   // Last Name input state
  const [results, setResults] = useState([]);     // API results
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");       // Error state

  // Handle changes in the First Name input
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFirstName(event.target.value);
  };

  // Handle changes in the Last Name input
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLastName(event.target.value);
  };

  // Fetch search results from the API based on the first and last name
  const fetchResults = async () => {
    // Check if both first name and last name are empty
    if (!firstName.trim() && !lastName.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Example API URL (replace with your API)
      const response = await axios.get(
        `https://api.example.com/search?firstName=${firstName}&lastName=${lastName}`
      );
      setResults(response.data); // Set the results from the API
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search when either input changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchResults();
    }, 500); // Debounce API call by 500ms

    return () => clearTimeout(debounceTimeout); // Cleanup on component unmount or input change
  }, [firstName, lastName]);

  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {/* First Name Input */}
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={handleFirstNameChange}
        sx={{ mb: 2 }}
      />

      {/* Last Name Input */}
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        value={lastName}
        onChange={handleLastNameChange}
        sx={{ mb: 2 }}
      />

      {/* Search Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={fetchResults}
        sx={{ mb: 2 }}
        disabled={loading} // Disable button while loading
      >
        Search
      </Button>

      {/* Show loading spinner while fetching data */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Show error message if any */}
      {error && (
        <Box sx={{ color: 'error.main', my: 2 }}>
          <p>{error}</p>
        </Box>
      )}

      {/* Show the search results */}
      <List>
        {results.length > 0 ? (
          results.map((item: any, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.firstName} ${item.lastName}`}
                secondary={item.email} // Example field, modify as needed
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No results found" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};
