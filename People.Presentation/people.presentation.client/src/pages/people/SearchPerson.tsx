import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Button,
  Grid2,
} from "@mui/material";
import * as peopleService from "../../services/people.service";
import {
  IPersonResponse,
  ISearchPersonRequest,
} from "../../models/person.model";
import { IResponseWrapper } from "../../models/response.model";

/**
 * Search person by firstName and lastName
 *
 * @returns {JSX.Element} component
 */
export const SearchPerson = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [results, setResults] = useState<IPersonResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /**
   * Handle changes in the firstName input
   *
   * @param event
   */
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFirstName(event.target.value);
  };

  /**
   * Handle changes in the lastName input
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   */
  const handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLastName(event.target.value);
  };

  /**
   * Fetch search results from the API based on the first and last name
   */
  const searchPerson = async () => {
    setIsLoading(true);
    setError("");
    try {
      /**
       * Check if both first name and last name are empty
       */
      if (!firstName.trim() && !lastName.trim()) {
        setResults([]);
        return;
      }

      const searchRequest: ISearchPersonRequest = { firstName, lastName };
      const apiResponse: IResponseWrapper<IPersonResponse[]> =
        await peopleService.searchPersonByFirstAndLastName(searchRequest);

      // Show an error if request not successful
      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      setResults(apiResponse.data);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setIsLoading(false);
      console.error(err);
    }
  };

  // Trigger search when either input changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchPerson();
    }, 500); // Debounce API call by 500ms

    return () => clearTimeout(debounceTimeout); // Cleanup on component unmount or input change
  }, [firstName, lastName]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        bgcolor: "background.paper",
        padding: 2,
      }}
    >
      {/* Search Fields Layout */}
      <Grid2 container spacing={2} alignItems="center">
        {/* First Name Field */}
        <Grid2>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={handleFirstNameChange}
            sx={{ mb: 2 }}
          />
        </Grid2>

        {/* Last Name Field */}
        <Grid2>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={handleLastNameChange}
            sx={{ mb: 2 }}
          />
        </Grid2>

        {/* Search Button */}
        <Grid2>
          <Button
            variant="contained"
            fullWidth
            onClick={searchPerson}
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>

      {/* Loading spinner */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error message */}
      {error && (
        <Box sx={{ color: "error.main", my: 2 }}>
          <p>{error}</p>
        </Box>
      )}

      {/* Results List */}
      <List>
        {results.length > 0 ? (
          results.map((item: ISearchPersonRequest, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.firstName} ${item.lastName}`}
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
