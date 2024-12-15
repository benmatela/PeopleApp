import { useState } from "react";
import { Header } from "../../components/header/Header";
import { CreatePerson } from "./CreatePerson";
import { ListPeople } from "./ListPeople";
import { UpdatePerson } from "./UpdatePerson";
import { Grid2 } from "@mui/material";
import { IPerson } from "../../models/person.model";

/**
 * People base component
 *
 * @returns {JSX.Element} component
 */
export const People = () => {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
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
