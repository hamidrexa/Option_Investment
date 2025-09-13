
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

// This interface is based on the likely structure of the details API response.
export interface ContractDetail {
  [key: string]: string | number | boolean;
}

export const fetchSymbolContracts = async (symbolId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://api.binazirchart.ir/market_information/symbol_info?base_tse_url=${symbolId}`, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") === -1) {
        throw new Error("Received non-JSON response from API");
    }
    
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching contract data for symbol ID ${symbolId}:`, error);
    throw error;
  }
};

export const fetchContractDetails = async (symbolId: string, expireDate: string): Promise<ContractDetail[]> => {
  try {
    const response = await fetch(`https://api.binazirchart.ir/market_information/symbol_info?base_tse_url=${symbolId}&contract_expire_date=${expireDate}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") === -1) {
      throw new Error("Received non-JSON response from API");
    }
    
    const data: ContractDetail[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching contract details for symbol ID ${symbolId} and date ${expireDate}:`, error);
    throw error;
  }
};
