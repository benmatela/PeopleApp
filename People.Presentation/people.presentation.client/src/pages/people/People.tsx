import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import { IPerson, IPersonResponse } from "../../models/person.model";
import "./People.css";
import { IResponseWrapper } from "../../models/response.model";
import { Box, Snackbar, SnackbarCloseReason } from "@mui/material";
import { SearchPerson } from "./SearchPerson";
import { Navbar } from "../../components/layout/Navbar";

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
   * The newly created person
   */
  const [personCreated, setPersonCreated] = useState<IPerson>();
  /**
   * The newly updadted person
   */
  const [personUpdated, setPersonUpdated] = useState<IPerson>();
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
  const [currentSelectedPerson, setCurrentSelectedPerson] = useState<IPerson>();
  /**
   * All people from the API
   */
  const [allPeople, setAllPeople] = useState<IPerson[]>([]);
  /**
   * Show/hide snackbar
   */
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Watch for the created/updated persons
  useEffect(() => {
    // Update the view with the newly created person
    if (personCreated) {
      setAllPeople((prevItems: IPerson[]) => [...prevItems, personCreated]);
      setPersonCreated(undefined);
    }
    // Update the view with the newly updated person
    if (personUpdated) {
      // Remove the person from old array and add the updated version
      setAllPeople((prevItems: IPerson[]) => [
        ...prevItems.filter((p) => p.id !== personUpdated.id),
        personUpdated,
      ]);
      setPersonUpdated(undefined);
    }
  }, [personCreated, allPeople, personUpdated]);

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
      console.log(event.type);
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: 1 }}>
      <Navbar />
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
          setOpenSnackbar={setOpenSnackbar}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setIsCreateMode={setIsCreateMode}
          setPersonCreated={setPersonCreated}
        />
      ) : (
        // Update a person
        <UpdatePerson
          currentPerson={currentSelectedPerson}
          isCreateMode={isCreateMode}
          setCurrentSelectedPerson={setCurrentSelectedPerson}
          setIsCreateMode={setIsCreateMode}
          setOpenSnackbar={setOpenSnackbar}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setPersonUpdated={setPersonUpdated}
        />
      )}
      {/* List of people */}
      <ListPeople
        isConfirmDialogOpen={isConfirmDialogOpen}
        isLoading={isLoading}
        isDeleting={isDeleting}
        errorMessage={errorMessage}
        allPeople={allPeople}
        currentPerson={currentSelectedPerson}
        setIsDeleting={setIsDeleting}
        setAllPeople={setAllPeople}
        setIsCreateMode={setIsCreateMode}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
        setErrorMessage={setErrorMessage}
        setCurrentPerson={setCurrentSelectedPerson}
      />
      {/* Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};
