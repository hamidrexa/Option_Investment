import type { PortfolioSnapshot, OptionContract, HistoricalPrice, Position, Underlying } from '@/types/domain';
import portfolios from '@/data/seed/portfolios.json';
import optionChains from '@/data/seed/option-chains.json';
import historicalPrices from '@/data/seed/historical-prices.json';

// Type guards to satisfy TypeScript when parsing JSON
function isPortfolioSnapshotArray(data: any): data is PortfolioSnapshot[] {
  return Array.isArray(data) && data.length > 0 && 'totalValue' in data[0];
}

function isOptionChainData(data: any): data is { [key: string]: { underlying: Underlying, contracts: OptionContract[] } } {
    return typeof data === 'object' && data !== null;
}

function isHistoricalPriceData(data: any): data is { [key: string]: HistoricalPrice[] } {
    return typeof data === 'object' && data !== null;
}

export function seedPortfolios(): PortfolioSnapshot[] {
  if (isPortfolioSnapshotArray(portfolios)) {
    return portfolios;
  }
  return [];
}

export function getPortfolioById(id: string): PortfolioSnapshot | undefined {
  return seedPortfolios().find(p => p.id === id);
}

export function seedOptionChains(): { [key: string]: { underlying: Underlying, contracts: OptionContract[] } } {
    if (isOptionChainData(optionChains)) {
        return optionChains;
    }
    return {};
}

export function getOptionChainForSymbol(symbol: string): { underlying: Underlying, contracts: OptionContract[] } | undefined {
    const chains = seedOptionChains();
    return chains[symbol.toUpperCase()];
}


export function seedHistoricalPrices(): { [key: string]: HistoricalPrice[] } {
    if (isHistoricalPriceData(historicalPrices)) {
        return historicalPrices;
    }
    return {};
}

export function getHistoricalPricesForSymbol(symbol: string): HistoricalPrice[] {
    const prices = seedHistoricalPrices();
    return prices[symbol.toUpperCase()] || [];
}

export function getPositionsForPortfolio(portfolioId: string): Position[] {
    const portfolio = getPortfolioById(portfolioId);
    return portfolio ? portfolio.positions : [];
}
