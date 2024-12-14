import { useState } from "react";
import { Header } from "../../components/header/Header";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import { Grid2 } from "@mui/material";
import { IPerson } from "../../models/person.model";

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
      {isCreateMode ? <CreatePerson /> : <UpdatePerson />}
      <ListPeople
        setCurrentlySelectedUser={setCurrentlySelectedUser}
        setIsCreateMode={setIsCreateMode}
      />
    </Grid2>
  );
};
