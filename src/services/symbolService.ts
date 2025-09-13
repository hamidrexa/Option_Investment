/// contracts 
export interface ApiResponse {
  contracts: Contract[];
  is_active: boolean;
}
export interface Contract {
  mature: number;
  expire_date: string;
  create_time: string;
  is_expired: boolean;
}


/// contract with option
export interface ApiDetailsResponse {
  contracts: DetailedContract[];
  pc: number;
  pl: number;
  py: number;
  is_active: boolean;
}

export interface DetailedContract {
  mature: number;
  expire_date: string;
  options: Option[];
  create_time: string;
  is_expired: boolean;
}

export interface Option {
  tse_url: string;
  blackscholes: number;
  bp: number;
  delta: number;
  gamma: number;
  l18: string;
  l30: string;
  lever: number;
  margin: number;
  pc: number;
  pl: number;
  position: number;
  ppc: number;
  ppl: number;
  rho: number;
  shekaf_gheymat: number;
  soud_az_foroush: number;
  status: string;
  stock: number;
  strike: number;
  theta: number;
  through: number;
  to_black: number;
  tval: number;
  tvol: number;
  vega: number;
  transaction: Transaction;
  contract?: number;
}

export interface Transaction {
  "1": {
    buy: number;
    sell: number;
    sellVol: number;
    buyVol: number;
  };
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

export const fetchContractDetails = async (symbolId: string, expireDate: string): Promise<ApiDetailsResponse> => {
  
  const url = `https://api.binazirchart.ir/market_information/symbol_info?base_tse_url=${symbolId}&contract_expire_date=${expireDate}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") === -1) {
      throw new Error("Received non-JSON response from API");
    }
    const data: ApiDetailsResponse = await response.json();
    
    return data;
  } catch (error) {
    console.error(`Error fetching contract details for symbol ID ${symbolId} and date ${expireDate}:`, error);
    throw error;
  }
};