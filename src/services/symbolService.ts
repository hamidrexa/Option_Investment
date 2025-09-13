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

// CORRECT: Changed symbolId parameter from 'number' to 'string'
export const fetchSymbolContracts = async (symbolId: string): Promise<ApiResponse> => {
  try {
    // The string symbolId will now be placed in the URL without any corruption.
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
    // You can decide how to handle errors. Rethrowing might be better for Promise.all
    throw error; 
  }
};