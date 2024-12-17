import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import { IPerson, IPersonResponse } from "../../models/person.model";
import "./People.css";
import { IResponseWrapper } from "../../models/response.model";
import {
  AppBar,
  Box,
  Grid2,
  InputAdornment,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { PeopleOutlined, Search } from "@mui/icons-material";

/**
 * People base component
 *
 * This is the parent component which will control majority of our state variables
 * unless they are specific to a child component.
 *
 * @returns {JSX.Element} component
 */
export const People = () => {
  /**
   * Is there any data loading currently in progress?
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /**
   * Is there any delete action going on?
   */
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  /**
   * Is there any update in action?
   */
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  /**
   * Holds error messages from performing certain actions such as API calls
   */
  const [errorMessage, setErrorMessage] = useState<string>("");
  /**
   * Holds success messages from performing certain actions such as API calls
   */
  const [successMessage, setSuccessMessage] = useState<string>("");
  /**
   * Shows/Hides the Confirmation Dialog
   */
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  /**
   * Controls the view for Create and Update components
   */
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
  /**
   * Acts as a DTO for the actioned user from the List component.
   *
   * Currently selected person on the list(for deleting, updating or any other action)
   */
  const [currentPerson, setCurrentPerson] = useState<IPerson>();
  /**
   * All people from the API
   */
  const [allPeople, setAllPeople] = useState<IPerson[]>([]);
  /**
   * Watches for user created event
   */
  const [searchTerm, setSearchTerm] = useState("");
  /**
   * Show/hide snackbar
   */
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Handles the snackbar
   *
   * @param {React.SyntheticEvent | Event} event
   * @param {string} reason
   * @returns {any} response
   */
  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  /**
   * Gets all users on first page load then ignores other state changes
   *
   * The empty array(no dependencies) helps archieve this.
   */
  useEffect(() => {
    getAllPeople();
  }, []);

  /**
   * Gets all people
   *
   * @throws {Error} error
   */
  const getAllPeople = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const apiResponse: IResponseWrapper<IPersonResponse[]> =
        await peopleService.getAll();

      // Throw error when there's an API error
      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      setAllPeople(apiResponse.data);
      setSuccessMessage("Done fetching people..");

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid2 sx={{ minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#1976d2", borderRadius: 2 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo or Title */}
          <PeopleOutlined sx={{ fontSize: 60, pt: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, mt: 1, ml: 2, fontWeight: "bold" }}
          >
            People Management
          </Typography>

          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                width: "200px",
                display: { xs: "none", sm: "block" }, // Hide on mobile
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {isCreateMode ? (
        // Create new Person
        <CreatePerson setCurrentPerson={setCurrentPerson} />
      ) : (
        // Update a person
        <UpdatePerson
          currentPerson={currentPerson}
          setCurrentPerson={setCurrentPerson}
          setIsUpdating={setIsUpdating}
          isUpdating={isUpdating}
          setPersonUpdated={() => {}}
        />
      )}
      {/* Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      {/* List of people */}
      <ListPeople
        isConfirmDialogOpen={isConfirmDialogOpen}
        isLoading={isLoading}
        isDeleting={isDeleting}
        errorMessage={errorMessage}
        allPeople={allPeople}
        currentPerson={currentPerson}
        setIsDeleting={setIsDeleting}
        setAllPeople={setAllPeople}
        setIsCreateMode={setIsCreateMode}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
        setErrorMessage={setErrorMessage}
        setCurrentPerson={setCurrentPerson}
      />
    </Grid2>
  );
};
