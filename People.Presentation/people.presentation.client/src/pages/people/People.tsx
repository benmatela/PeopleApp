import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import { IPerson, IPersonResponse } from "../../models/person.model";
import "./People.css";
import { IResponseWrapper } from "../../models/response.model";
import { Grid2 } from "@mui/material";
import { Header } from "../../components/header/Header";

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
   * Is there any delete in action?
   */
  const [isSaving, setIsSaving] = useState<boolean>(false);
  /**
   * Is there any update in action?
   */
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  /**
   * Holds error messages from performing certain actions such as API calls
   */
  const [errorMessage, setErrorMessage] = useState<string>("");
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
  const [personCreated, setPersonCreated] = useState<boolean>(false);
  /**
   * Watches for user updated event
   */
  const [personUpdated, setPersonUpdated] = useState<boolean>(false);
  /**
   * Watches for user deleted event
   */
  const [personDeleted, setPersonDeleted] = useState<boolean>(false);

  /**
   * This is used solely to keep track of a Person's's state
   *
   * This brings the question of too many state variables vs
   * using state management frameworks such as Redux
   */
  useEffect(() => {
    if (personCreated && currentPerson) {
      // Adds the newly created person to the currently displayed list
      // This avoids too many unnecessary API calls
      const allExistingPeople: IPerson[] = allPeople;
      allExistingPeople.push(currentPerson);
      setAllPeople(allExistingPeople);
      setPersonCreated(false);
    } else if (personUpdated && currentPerson) {
      // Updates the currently displayed list with the updated person
      // This avoids too many unnecessary API calls
      const allExistingPeople: IPerson[] = allPeople;
      const updatedPerson = allPeople.find((p) => p.id === currentPerson.id);
      if (updatedPerson) {
        allExistingPeople.push(currentPerson);
        setAllPeople(allExistingPeople);
      }
      setPersonUpdated(false);
    } else if (personDeleted && currentPerson) {
      // Removes the deleted person person from the currently displayed list
      // This avoids too many unnecessary API calls
      const allExistingPeople: IPerson[] = allPeople.filter(
        (p) => p.id !== currentPerson.id
      );
      allExistingPeople.push(currentPerson);
      setAllPeople(allExistingPeople);
      setPersonDeleted(false);
    }
  }, [personCreated, allPeople, currentPerson, personUpdated, personDeleted]);

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

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid2 sx={{ minHeight: "100vh" }}>
     <Header title="Co-Flo" subTitle="A directory of very important people"/>
      {isCreateMode ? (
        <CreatePerson
          currentPerson={currentPerson}
          setCurrentPerson={setCurrentPerson}
          setPersonCreated={setPersonCreated}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
        />
      ) : (
        <UpdatePerson
          currentPerson={currentPerson}
          setCurrentPerson={setCurrentPerson}
          setIsUpdating={setIsUpdating}
          isUpdating={isUpdating}
          setPersonUpdated={setPersonUpdated}
        />
      )}
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
