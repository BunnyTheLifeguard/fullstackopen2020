import patients from "../data/patients";
import { v4 as uuidv4 } from "uuid";

import { withoutSsn, PatientEntry, newPatientEntry, Patient } from "../types";

const getEntries = (): withoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string) => {
  const entry = patients.find((p) => p.id === id);
  if (!entry) {
    return undefined;
  } else if (!("entries" in entry)) {
    const withEntries = { ...entry as PatientEntry, entries: [] };
    return withEntries;
  }
  return entry;
};

const addEntry = (entry: newPatientEntry): PatientEntry => {
  if ("entries" in entry) {
    const newPatient = {
      id: uuidv4(),
      ...entry as Patient,
    };
    patients.push(newPatient);
    return newPatient;
  } else {
    const newPatient = {
      id: uuidv4(),
      entries: [],
      ...entry as Patient,
    };
    patients.push(newPatient);
    return newPatient;
  }
};

export default {
  getEntries,
  addEntry,
  findById,
};
