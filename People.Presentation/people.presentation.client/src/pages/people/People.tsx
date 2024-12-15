import { useState } from "react";
import { Header } from "../../components/header/Header";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import { Grid2 } from "@mui/material";
import { IPerson } from "../../models/person.model";
import "./People.css";

/**
 * People base component
 *
 * @returns {JSX.Element} component
 */
export const People = () => {
  /**
   * Controls the view for Create and Update components
   */
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
  /**
   * Acts as a DTO for the actioned user from the List component.
   *
   * Used across People related components
   */
  const [currentlySelectedPerson, setCurrentlySelectedPerson] =
    useState<IPerson>();

  return (
    <Grid2>
      <Header
        title="Co-Flo People"
        subTitle="A directory of very important people"
      />
      {isCreateMode ? (
        <CreatePerson />
      ) : (
        <UpdatePerson isCreateMode={isCreateMode} />
      )}
      <ListPeople
        setCurrentlySelectedUser={setCurrentlySelectedPerson}
        setIsCreateMode={setIsCreateMode}
        currentlySelectedPerson={currentlySelectedPerson}
      />
    </Grid2>
  );
};
