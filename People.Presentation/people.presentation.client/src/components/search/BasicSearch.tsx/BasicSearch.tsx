import { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

export const BasicSearch = () => {
  /**
   * Search query
   */
  const [query, setQuery] = useState("");
  /**
   * Results from API
   */
  const [results, setResults] = useState([]);
  /**
   * Loading state
   */
  const [isLoading, setIsLoading] = useState(false);
  /**
   * Error state
   */
  const [error, setError] = useState(null);

  // Function to handle search input
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuery(event.target.value);
  };

  // Function to call the API
  const fetchResults = async () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Example API URL (replace with your API)
      const response = await axios.get(
        `https://api.example.com/search?q=${query}`
      );
      setResults(response.data); // Set the results from the API
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data whenever the query changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchResults();
    }, 500); // Debounce API call by 500ms

    return () => clearTimeout(debounceTimeout); // Cleanup on component unmount or query change
  }, [query]);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box sx={{ color: "error.main", my: 2 }}>
          <p>{error}</p>
        </Box>
      )}

      <List>
        {results.length > 0 ? (
          results.map((item: any, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} secondary={item.description} />
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
