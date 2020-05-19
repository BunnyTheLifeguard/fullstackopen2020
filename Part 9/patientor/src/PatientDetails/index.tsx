import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = React.useState<Patient | undefined>();

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
  }, [id]);

  if (patient) {
    console.log(patient.entries);
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
                    e.diagnosisCodes.map((c: string) => <li key={c}>{c}</li>)}
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
