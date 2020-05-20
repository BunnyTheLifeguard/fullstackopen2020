import diagnosis from "../data/diagnosis";

import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnosis.map(({ code, name, latin }) => ({ code, name, latin }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
