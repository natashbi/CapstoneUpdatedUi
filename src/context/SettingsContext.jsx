import { createContext, useContext } from 'react';

export const SettingsContext = createContext({
  coverageLimit: 150000,
  memberConsultLimit: 24,
  dependentConsultLimit: 4,
  loaValidityDays: 7,
  lowBalanceThreshold: 30000,
});

export const useSettings = () => useContext(SettingsContext);
