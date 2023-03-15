// libs
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// interfaces
import { IPractitioner } from "../interfaces/iPractitioner";
import { IPractitionerReportResponse } from "../interfaces/iPractitionerReportResponse";

// utils
import constants from "../common/constants";
import { IAppointment } from "../interfaces/iAppointment";
import { IPractitionerAppointmentRequest } from "../interfaces/iPractitionerAppointmentRequest";

//components
import AppointmentDetail from "./appointment-detail";
import AppointmentList from "./appointment-list";

type properties = {
  practitioner: IPractitioner | undefined;
};

function PractitionerReport({ practitioner }: properties) {
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [appointmentReq, setAppointmentReq] = useState<IPractitionerAppointmentRequest | null>(null);
  const [report, setReport] = useState<IPractitionerReportResponse[]>([]);
  const [appointment, setAppointment] = useState<IAppointment | null>(null);

  useEffect(() => {
    getReport();
  }, [practitioner]);

  function getReport () {
    if (practitioner && practitioner.id) {
      const request = {
        start: startDateRef?.current?.value ? startDateRef.current.value : null,
        end: endDateRef?.current?.value ? endDateRef.current.value : null,
        practitionerId: practitioner.id,
      };
      axios
        .post<IPractitionerReportResponse[]>(
          `${constants.baseUrl}/practitioners/PractitionerReport`,
          request
        )
        .then(function (response) {
          setReport(response.data);
          setAppointmentReq(null);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  function getAppointments(item: IPractitionerReportResponse) {
    if (practitioner && practitioner.id) {
      const request: IPractitionerAppointmentRequest = {
        year: +item.year,
        month: item.monthIndex,
        practitionerId: practitioner.id
      };

      setAppointmentReq(request);
    }
  }

  function assignAppointment(appointment: IAppointment | null) {
    setAppointment(appointment)
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="mb-3">
            Practitioner Report UI - {practitioner ? practitioner.name : "None"}{" "}
          </h2>

          <div className="row">
            <div className="col-4">
              <div className="form-group mb-2">
                <label className="sr-only">Start</label>
                <input
                  type="date"
                  className="form-control"
                  id="start"
                  ref={startDateRef}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group mb-2">
                <label className="sr-only">End</label>
                <input
                  type="date"
                  className="form-control"
                  id="end"
                  ref={endDateRef}
                />
              </div>
            </div>
            <div className="col-4">
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={getReport}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8 table-responsive">
          <table className="table table-bordered table-hover table-stripped w-100">
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Cost</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item) => {
                return <tr key={item.year + item.month} className="cursor-pointer" onClick={ () => getAppointments(item)}>
                  <td>{item.year}</td>
                  <td>{item.month}</td>
                  <td>{item.cost}</td>
                  <td>{item.revenue}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div className="col-4">
              <AppointmentList request={appointmentReq} assignAppointment={assignAppointment} />
              <AppointmentDetail appointment={appointment} />
        </div>
      </div>
    </>
  );
}

export default PractitionerReport;
