
import type { PortfolioSnapshot, OptionContract, HistoricalPrice, Position, Underlying, Strategy } from '@/types/domain';
import portfoliosData from '@/data/seed/portfolios.json';
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

// In-memory cache to avoid re-parsing JSON files
let portfolios: PortfolioSnapshot[] | null = null;

export function seedPortfolios(): PortfolioSnapshot[] {
  if (portfolios) return portfolios;

  if (isPortfolioSnapshotArray(portfoliosData)) {
    // Post-process strategies to link positions
    portfolios = portfoliosData.map(portfolio => {
        const processedStrategies = portfolio.strategies.map(strategy => {
            let marketValue = 0;
            const legs = (strategy.legs as any[]).map(leg => {
                const position = portfolio.positions.find(p => p.id === leg.positionId);
                if (position) {
                    marketValue += position.marketValue;
                }
                return position ? { ...leg, position } : leg;
            });
            return { ...strategy, legs, marketValue };
        });
        return { ...portfolio, strategies: processedStrategies as Strategy[] };
    });
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
    // Assuming symbols in JSON are uppercase
    return chains[symbol.toUpperCase()] || chains[symbol]; 
}


export function seedHistoricalPrices(): { [key: string]: HistoricalPrice[] } {
    if (isHistoricalPriceData(historicalPrices)) {
        return historicalPrices;
    }
    return {};
}

export function getHistoricalPricesForSymbol(symbol: string): HistoricalPrice[] {
    const prices = seedHistoricalPrices();
    // Assuming symbols in JSON are uppercase
    return prices[symbol.toUpperCase()] || prices[symbol] || [];
}

export function getPositionsForPortfolio(portfolioId: string): Position[] {
    const portfolio = getPortfolioById(portfolioId);
    return portfolio ? portfolio.positions : [];
}
