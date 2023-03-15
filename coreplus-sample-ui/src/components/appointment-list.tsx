// libs
import axios from "axios";
import { useEffect, useState } from "react";

// utils
import constants from "../common/constants";

// interfaces
import { IAppointment } from "../interfaces/iAppointment";
import { IPractitionerAppointmentRequest } from "../interfaces/iPractitionerAppointmentRequest";

type properties = {
  request: IPractitionerAppointmentRequest | null;
  assignAppointment: (appointment: IAppointment | null) => void;
};

function AppointmentList({ request, assignAppointment }: properties) {
  const [appointments, setAppointment] = useState<IAppointment[]>([]);
  const [currentAppointment, setCurrentAppointment] = useState<IAppointment | null>(null);

  useEffect(() => {
    getAppointments();
  }, [request]);

  function getAppointments() {
    if (request) {
      axios
        .post<IAppointment[]>(
          `${constants.baseUrl}/practitioners/appointments`,
          request
        )
        .then(function (response) {
          setAppointment(response.data);
          assignAppointment(null);
          setCurrentAppointment(null);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      setAppointment([]);
      assignAppointment(null);
    }
  }

  return (
    <>
      {appointments && appointments.length ? (
        <div className="row appointment-max-height">
          <div className="col-12">
            <h2>Appointments</h2>
          </div>
          <div className="col-12 table-responsive">
            <table className="table table-bordered table-hover table-stripped w-100">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Cost</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className={
                        currentAppointment?.id == item.id
                          ? "cursor-pointer active"
                          : "cursor-pointer"
                      }
                      onClick={() => { assignAppointment(item); setCurrentAppointment(item); }}
                    >
                      <td>{item.date}</td>
                      <td>{item.cost}</td>
                      <td>{item.revenue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AppointmentList;
