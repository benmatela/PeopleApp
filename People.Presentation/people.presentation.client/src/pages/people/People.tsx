import { useEffect, useState } from "react";
import * as peopleService from "../../services/people.service";
import { Header } from "../../components/header/Header";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import Box from "@mui/material/Box";
import { IPerson, IPersonResponse } from "../../models/person.model";
import "./People.css";
import { IResponseWrapper } from "../../models/response.model";

/**
 * People base component
 *
 * @returns {JSX.Element} component
 */
export const People = () => {
  /**
   * Is this the first time the page loads?
   */
  const [isInitialPageLoad, setIsInitialPageLoad] = useState<boolean>(true);
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

  useEffect(() => {
    if (isInitialPageLoad) {
      setIsInitialPageLoad(false);
    }
  }, [isInitialPageLoad]);

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

      if (!apiResponse.success) {
        setErrorMessage(apiResponse.message);
        throw new Error(apiResponse.message);
      }

      setAllPeople(apiResponse.data);

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  return (
    <Box>
      <Header
        title="Co-Flo People"
        subTitle="A directory of very important people"
      />
      {isCreateMode ? (
        <CreatePerson
          currentPerson={currentPerson}
          allPeople={allPeople}
          setCurrentPerson={setCurrentPerson}
          setAllPeople={setAllPeople}
        />
      ) : (
        <UpdatePerson
          allPeople={allPeople}
          setAllPeople={setAllPeople}
          currentPerson={currentPerson}
          setCurrentPerson={setCurrentPerson}
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
    </Box>
  );
};
