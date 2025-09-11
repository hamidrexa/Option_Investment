export type UUID = string;

export interface Underlying {
  symbol: string;
  name?: string;
  lastPrice: number;
  closePrice: number;
  timestamp: string;
}

export interface OptionContract {
  id: UUID;
  underlying: string;
  strike: number;
  expiry: string; // YYYY-MM-DD
  type: 'call' | 'put';
  last: number;
  bid?: number;
  ask?: number;
  volume?: number;
  openInterest?: number;
  impliedVol: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho?: number;
  timeValue?: number;
  intrinsicValue?: number;
  initialMargin?: number;
  theoreticalPrice?: number;
}

export interface Position {
  id: UUID;
  symbol: string; // underlying or option id
  instrumentType: 'option' | 'underlying' | 'future' | 'cash';
  underlying?: string;
  strike?: number;
  expiry?: string;
  optionType?: 'call' | 'put';
  optionSide?: 'buy' | 'sell';
  quantity: number;
  avgCost: number;
  marketPrice: number;
  marketValue: number;
  unrealizedPnl: number;
  realizedPnl: number;
  greeks?: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho?: number;
  };
  strategyId?: UUID;
  broker?: string;
  lastTradeTimestamp?: string;
  currency?: string;
  notes?: string;
  portfolioAllocation?: number;
}

export interface Strategy {
  id: UUID;
  name: string;
  legs: Array<{
    contractId?: UUID;
    type: 'call' | 'put';
    side: 'buy' | 'sell';
    strike: number;
    expiry: string;
    qty: number;
  }>;
  greeks: { delta: number; gamma: number; theta: number; vega: number };
  notional: number;
  currentPnL: number;
  marketValue: number;
}

export interface PortfolioSnapshot {
  id: UUID;
  name: string;
  totalValue: number;
  totalValueAtClose: number;
  cash: number;
  marginUsed: number;
  totalPnL: number;
  totalPnLPercent: number;
  positions: Position[];
  strategies: Strategy[];
  timestamp: string;
}

export interface HistoricalPrice {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
}
