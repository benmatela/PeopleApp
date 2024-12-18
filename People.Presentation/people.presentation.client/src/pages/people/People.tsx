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
  Grid2,
  Snackbar,
  SnackbarCloseReason,
  Toolbar,
  Typography,
} from "@mui/material";
import { PeopleOutlined } from "@mui/icons-material";
import { SearchPerson } from "./SearchPerson";

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
   * Show/hide snackbar
   */
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      console.log(event);
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
    <Grid2 sx={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: 1 }}>
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
        </Toolbar>
      </AppBar>
      {/* Search Bar */}
      <SearchPerson
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
        setOpenSnackbar={setOpenSnackbar}
      />
      {isCreateMode ? (
        // Create new Person
        <CreatePerson
          isCreateMode={isCreateMode}
          setCurrentPerson={setCurrentPerson}
          setOpenSnackbar={setOpenSnackbar}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setIsCreateMode={setIsCreateMode}
        />
      ) : (
        // Update a person
        <UpdatePerson
          currentPerson={currentPerson}
          isCreateMode={isCreateMode}
          setCurrentPerson={setCurrentPerson}
          setIsCreateMode={setIsCreateMode}
          setOpenSnackbar={setOpenSnackbar}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
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
      {/* Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Grid2>
  );
};
