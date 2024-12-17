import React, { Dispatch, useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Button,
  Grid2,
  Container,
  Typography,
  Card,
} from "@mui/material";
import * as peopleService from "../../services/people.service";
import {
  IPersonResponse,
  ISearchPersonRequest,
} from "../../models/person.model";
import { IResponseWrapper } from "../../models/response.model";

interface SearchPersonProps {
  setOpenSnackbar: Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: Dispatch<React.SetStateAction<string>>;
}

/**
 * Search person by firstName and lastName
 *
 * We can improve this by making it a reusabe component and
 * also listening for firstName and lastName fields change to auto search
 *
 * @returns {JSX.Element} component
 */
export const SearchPerson = ({
  setOpenSnackbar,
  setErrorMessage,
  setSuccessMessage,
}: SearchPersonProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  /**
   * All people found when searching
   */
  const [results, setResults] = useState<IPersonResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setErrorMessage("");
    setSuccessMessage("");
    try {
      // Check if both first name and last name are empty
      if (!firstName.trim() && !lastName.trim()) {
        setResults([]);
        return;
      }

      // Similar model to what we have on the API for searching
      const searchQuery: ISearchPersonRequest = {
        firstName: firstName,
        lastName: lastName,
      };
      const apiResponse: IResponseWrapper<IPersonResponse[]> =
        await peopleService.searchPersonByFirstAndLastName(searchQuery);

      // Throw an error if request is not successful
      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      setResults(apiResponse.data);
      setSuccessMessage(`Yay! a user was found`);
      setOpenSnackbar(true);
      setIsLoading(false);
    } catch (errorMessage: any) {
      // Handle the errors
      setErrorMessage(errorMessage.message);
      setIsLoading(false);
    }
  };

  /**
   * Clears search
   */
  const onClearSearch = () => {
    setResults([]);
    setIsLoading(false);
    setFirstName("");
    setLastName("");
  };

  return (
    <Card
      sx={{
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        backgroundColor: "#f0f9ff",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          borderRadius: 2,
          padding: 3,
          marginBottom: 3,
        }}
      >
        <Grid2 container spacing={2} alignItems="center">
          <Grid2>
            <TextField
              variant="outlined"
              size="small"
              placeholder="First Name"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                width: "200px",
                display: { xs: "none", sm: "block" }, // Hide on mobile
              }}
              fullWidth
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </Grid2>

          <Grid2>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Last Name"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                width: "200px",
                display: { xs: "none", sm: "block" }, // Hide on mobile
              }}
              fullWidth
              value={lastName}
              onChange={handleLastNameChange}
            />
          </Grid2>

          <Grid2>
            <Button
              variant="outlined"
              fullWidth
              onClick={onClearSearch}
              disabled={isLoading}
            >
              Clear
            </Button>
          </Grid2>

          <Grid2>
            <Button
              variant="contained"
              fullWidth
              onClick={searchPerson}
              disabled={isLoading}
            >
              Search
            </Button>
          </Grid2>

          {/* Loading spinner */}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Grid2>
      </Container>
      {/* Results List */}
      <Grid2
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          borderRadius: 2,
          backgroundColor: "",
        }}
      >
        <Typography variant="h5">Search Results: </Typography>
        <List>
          {results.length > 0 ? (
            results.map((person: IPersonResponse) => (
              <ListItem key={person.id}>
                <ListItemText
                  primary={`${person.firstName} ${person.lastName} - Age ${person.age}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No search results found" />
            </ListItem>
          )}
        </List>
      </Grid2>
    </Card>
  );
};
