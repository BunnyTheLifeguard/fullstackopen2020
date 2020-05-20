import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [diagnosis, setDiagnosis] = React.useState<Diagnosis[] | undefined>();

  React.useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const patientDetails = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        setPatient(patientDetails.data);
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data);
      }
    };
    getPatientDetails();

    const getDiagnosisList = async () => {
      try {
        const diagnosisList = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`,
        );
        setDiagnosis(diagnosisList.data);
      } catch (e) {
        console.error(e.response);
        setError(e.response);
      }
    };
    getDiagnosisList();
  }, [id]);

  if (patient && diagnosis) {
    return (
      <div>
        <h2>
          {patient.name}
          {patient.gender === "male"
            ? <Icon name="man" />
            : <Icon name="woman" />}
        </h2>
        <p>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
        </p>
        <h3>entries</h3>
        {patient.entries.length > 0 &&
          <div>
            {patient.entries.map((e) => (
              <div key={e.id}>
                <p key={e.id}>{e.date}{" "}{e.description}</p>
                <ul>
                  {e.diagnosisCodes !== undefined &&
                    e.diagnosisCodes.map((c: string) =>
                      <li key={c}>
                        {c}
                        {" "}
                        {diagnosis !== undefined &&
                          diagnosis.filter((d) => d.code === c)[0].name}
                      </li>
                    )}
                </ul>
              </div>
            ))}
          </div>}
      </div>
    );
  } else {
    return (
      <div>
        {error}
      </div>
    );
  }
};

export default PatientDetails;
