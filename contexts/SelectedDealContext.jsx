import { createContext, useContext } from 'react';

export const SelectDealContext = createContext(null);

export function SelectedDealProvider({ selectedDeal, setSelectedDeal, children }) {
  return (
    <SelectDealContext.Provider value={[selectedDeal, setSelectedDeal]}>
      {children}
    </SelectDealContext.Provider>
  )
}
export function useSelectedDeal() {
  return useContext(SelectDealContext);
}