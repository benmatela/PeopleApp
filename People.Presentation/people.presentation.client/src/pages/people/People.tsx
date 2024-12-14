import { useEffect } from "react";
import Header from "../../components/header/Header";
import CreatePerson from "./CreatePerson";
import UpdatePerson from "./UpdatePerson";

const People = () => {
  useEffect(() => {
    // populateWeatherData();
  }, []);

  return (
    <div>
      <Header
        title="Co-Flo People"
        subTitle="A directory of important people"
      />
      <CreatePerson />
      <UpdatePerson />
    </div>
  );
};

export default People;
