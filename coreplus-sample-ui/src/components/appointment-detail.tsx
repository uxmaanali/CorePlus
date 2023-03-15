//libs
import { useEffect } from "react";
// interfaces
import { IAppointment } from "../interfaces/iAppointment";

type properties = {
  appointment: IAppointment | null;
};
function AppointmentDetail({ appointment }: properties) {
  useEffect(() => {}, [appointment]);
  return (
    <>
      {appointment && appointment.id ? (
        <div className="card">
          <div className="card-header">Client - { appointment.client_name }</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Date - {appointment.date}</li>
            <li className="list-group-item">Cost - { appointment.cost }</li>
            <li className="list-group-item">Revenue - {appointment.revenue}</li>
            <li className="list-group-item">Type - {appointment.appointment_type}</li>
            <li className="list-group-item">Duration - {appointment.duration}</li>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default AppointmentDetail;
