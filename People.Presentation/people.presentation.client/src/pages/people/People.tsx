/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../components/header/Header";
import CreatePerson from "./CreatePerson";
import ListPeople from "./ListPeople";
import UpdatePerson from "./UpdatePerson";

/**
 * @returns {JSX.Element} component
 */
const People = () => {
  return (
    <div>
      <Header
        title="Co-Flo People"
        subTitle="A directory of important people"
      />
      <CreatePerson />
      <UpdatePerson />
      <ListPeople />
    </div>
  );
};

export default People;
