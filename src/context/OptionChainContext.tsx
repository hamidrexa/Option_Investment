"use client";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { DetailedContract, fetchContractDetails } from '@/services/symbolService';

interface OptionChainState {
  data: DetailedContract[] | null;
  isLoading: boolean;
  error: string | null;
  fetchOptionChain: (symbolId: string, expireDate: string) => Promise<void>;
  selectedSymbol: string | null;
  selectedDate: string | null;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const OptionChainContext = createContext<OptionChainState | undefined>(undefined);

export const OptionChainProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DetailedContract[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('symbols');


  const fetchOptionChain = async (symbolId: string, expireDate: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchContractDetails(symbolId, expireDate);
      
      const selectedDateObj = new Date(expireDate);
      // The API might return details for other dates, so we filter for the selected one.
      const filteredContracts = result.contracts.filter(c => {
        const contractDate = new Date(c.expire_date);
        return contractDate.getFullYear() === selectedDateObj.getFullYear() &&
               contractDate.getMonth() === selectedDateObj.getMonth() &&
               contractDate.getDate() === selectedDateObj.getDate();
      });

      setData(filteredContracts);
      setSelectedSymbol(symbolId);
      setSelectedDate(new Date(expireDate).toLocaleDateString("fa-IR"));
      setActiveTab('option-chain'); // Switch tab after fetching
    } catch (e) {
      setError("خطا در دریافت جزئیات قرارداد. لطفاً دوباره تلاش کنید.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = { 
    data, 
    isLoading, 
    error, 
    fetchOptionChain, 
    selectedSymbol, 
    selectedDate,
    activeTab,
    setActiveTab
  };

  return (
    <OptionChainContext.Provider value={value}>
      {children}
    </OptionChainContext.Provider>
  );
};

export const useOptionChain = () => {
  const context = useContext(OptionChainContext);
  if (context === undefined) {
    throw new Error('useOptionChain must be used within an OptionChainProvider');
  }
  return context;
};
