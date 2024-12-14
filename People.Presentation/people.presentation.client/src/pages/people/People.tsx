import { useEffect } from "react";
import StripedRowTable from "../../components/table/StripedRowTable";

const People = () => {

      useEffect(() => {
          // populateWeatherData();
      }, []);

  return (
    <div>
      <StripedRowTable />
    </div>
  );
};

export default People;
