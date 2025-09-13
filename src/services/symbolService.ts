
import optionChainsData from '@/data/seed/option-chains.json';

export interface Contract {
  mature: number;
  expire_date: string;
  create_time: string;
  is_expired: boolean;
}

export interface ApiResponse {
  contracts: Contract[];
  is_active: boolean;
}

export interface ContractDetail {
  [key: string]: string | number | boolean;
}

// Mock implementation to avoid real network calls
const mockContracts: { [key: string]: Contract[] } = {
  "خودرو": [
    { mature: 1, expire_date: "2024-12-20", create_time: "2023-12-20", is_expired: false },
    { mature: 1, expire_date: "2025-03-20", create_time: "2024-03-20", is_expired: false },
  ],
  "فولاد": [
    { mature: 1, expire_date: "2024-11-15", create_time: "2023-11-15", is_expired: false },
  ],
   "شستا": [
    { mature: 1, expire_date: "2024-09-20", create_time: "2023-09-20", is_expired: false },
  ]
};

export const fetchSymbolContracts = async (symbolId: string): Promise<ApiResponse> => {
  console.log(`Mock fetching contract data for symbol ID ${symbolId}`);
  // Find symbol name from id in symbols.json mock (or just use a fallback)
  const symbol = "خودرو"; // Fallback
  const contracts = mockContracts[symbol] || [];
  
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return Promise.resolve({
    contracts: contracts,
    is_active: contracts.length > 0,
  });
};

export const fetchContractDetails = async (symbolId: string, expireDate: string): Promise<ContractDetail[]> => {
    console.log(`Mock fetching contract details for symbol ID ${symbolId} and date ${expireDate}`);
    
    // Using the detailed data from option-chains.json as mock details
    const chainData = (optionChainsData as any)["خودرو"];
    if (chainData) {
        const details = chainData.contracts.filter((c: any) => c.expiry === expireDate);
        if(details.length > 0) {
            return Promise.resolve(details);
        }
    }

    // Fallback if no data is found
    const mockDetail: ContractDetail[] = [
        {
            "id": `ضخود-خ-mock-${expireDate}`,
            "underlying": "خودرو",
            "strike": 18000,
            "expiry": expireDate,
            "type": "call",
            "last": 1500,
        }
    ];

    await new Promise(resolve => setTimeout(resolve, 50));
    return Promise.resolve(mockDetail);
};