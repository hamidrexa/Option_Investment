
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

export const fetchSymbolContracts = async (symbolId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://api.binazirchart.ir/market_information/symbol_info?base_tse_url=${symbolId}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    // Check if the response is JSON, if not, it might be the HTML error
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
