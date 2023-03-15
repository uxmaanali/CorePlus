// libs
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// css
import "bootstrap/dist/css/bootstrap.css";
import "./app.css";

// components
import PractitionerReport from "./components/practitioner-report";

// interfaces
import { IPractitioner } from "./interfaces/iPractitioner";

// utils
import constants from "./common/constants";

function App() {
  const loadfetchPractitioners = useRef(true);
  const [supervisors, setSupervisors] = useState<IPractitioner[]>([]);
  const [practitioners, setPractitioners] = useState<IPractitioner[]>([]);
  const [currentPractitioner, setcurrentPractitioner] = useState<
    IPractitioner | undefined
  >(undefined);
  useEffect(() => {
    if (loadfetchPractitioners.current) {
      loadfetchPractitioners.current = false;
      fetchSupervisors();
      fetchPractitioners();
    }
  }, []);

  function fetchSupervisors() {
    axios
      .get<IPractitioner[]>(`${constants.baseUrl}/practitioners/supervisors`)
      .then(function (response) {
        setSupervisors(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function fetchPractitioners() {
    axios
      .get<IPractitioner[]>(`${constants.baseUrl}/practitioners/practitioners`)
      .then(function (response) {
        setPractitioners(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  return (
    <div className="h-screen w-full appshell">
      <div className="header flex flex-row items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <div className="supervisors">
        <h3 className="header-title">Supervisor practitioners</h3>
        <ul className="list-group">
          {supervisors.map((item) => {
            return (
              <li
                key={item.id}
                className= {
                  currentPractitioner?.id == item.id ? "list-group-item cursor-pointer active" : "list-group-item cursor-pointer"
                }
                onClick={() => {
                  setcurrentPractitioner(item);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="praclist">
        <h3 className="header-title">Remaining Practitioners</h3>
        <ul className="list-group">
          {practitioners.map((item) => {
            return (
              <li
                key={item.id}
                className= {
                  currentPractitioner?.id == item.id ? "list-group-item cursor-pointer active" : "list-group-item cursor-pointer"
                }
                onClick={() => {
                  setcurrentPractitioner(item);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pracinfo">
        <PractitionerReport practitioner={currentPractitioner} />
      </div>
    </div>
  );
}

export default App;
