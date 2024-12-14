import { useEffect } from "react";
import Header from "../../components/header/Header";
import CreatePerson from "./CreatePerson";

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
    </div>
  );
};

export default People;
