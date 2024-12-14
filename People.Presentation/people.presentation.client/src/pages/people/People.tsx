import { useState } from "react";
import { Header } from "../../components/header/Header";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import { Grid2 } from "@mui/material";
import { IPerson } from "../../models/person.model";
import { AlertDialog } from "../../components/modals/ConfirmationModal";

/**
 * @returns {JSX.Element} component
 */
export const People = () => {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
  const [currentlySelectedUser, setCurrentlySelectedUser] = useState<IPerson>();

  return (
    <Grid2>
      <Header
        title="Co-Flo People"
        subTitle="A directory of important people"
      />
      {currentlySelectedUser?.firstName}
      {isCreateMode ? (
        <CreatePerson />
      ) : (
        <UpdatePerson isCreateMode={isCreateMode} />
      )}
      <ListPeople
        setCurrentlySelectedUser={setCurrentlySelectedUser}
        setIsCreateMode={setIsCreateMode}
      />
      <AlertDialog />
    </Grid2>
  );
};
