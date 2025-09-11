"use client";

import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { PortfolioSnapshot, Position, HistoricalPrice } from '@/types/domain';
import { getPortfolioById, getHistoricalPricesForSymbol } from '@/lib/mock-data';
import { emulatePriceTrends } from '@/ai/flows/emulate-price-trends';
import { calculateGreeks } from '@/lib/pricing/bsm';

interface DemoContextType {
  isLive: boolean;
  toggleLive: () => void;
  portfolio: PortfolioSnapshot | null;
  isLoading: boolean;
  error: string | null;
}

export const DemoContext = createContext<DemoContextType | null>(null);

const DEFAULT_PORTFOLIO_ID = 'pf-001';

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLive, setIsLive] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = () => {
      try {
        const initialPortfolio = getPortfolioById(DEFAULT_PORTFOLIO_ID);
        if (initialPortfolio) {
          setPortfolio(initialPortfolio);
        } else {
          setError('Failed to load initial portfolio data.');
        }
      } catch (e) {
        setError('An error occurred while fetching portfolio data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const toggleLive = () => {
    setIsLive(prev => !prev);
  };
  
  const updatePortfolioData = useCallback(async (basePortfolio: PortfolioSnapshot) => {
    const underlyingSymbols = [...new Set(basePortfolio.positions.map(p => p.underlying || p.symbol).filter(Boolean))];
    let updatedPositions = [...basePortfolio.positions];
    let totalMarketValue = 0;
    let totalUnrealizedPnl = 0;

    for (const symbol of underlyingSymbols) {
      const history = getHistoricalPricesForSymbol(symbol).slice(-5);
      if (history.length === 0) continue;
      
      try {
        const emulatedTrends = await emulatePriceTrends({ history });
        const newPrice = emulatedTrends[emulatedTrends.length - 1]?.price;

        if (newPrice) {
          updatedPositions = updatedPositions.map(pos => {
            if (pos.underlying === symbol || pos.symbol === symbol) {
               let newMarketPrice = pos.marketPrice;
               if (pos.instrumentType === 'underlying') {
                   newMarketPrice = newPrice;
               } else if (pos.instrumentType === 'option' && pos.strike && pos.expiry && pos.optionType) {
                   const timeToExpiry = (new Date(pos.expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365);
                   const newGreeks = calculateGreeks({
                       underlyingPrice: newPrice,
                       strikePrice: pos.strike,
                       timeToExpiry: timeToExpiry > 0 ? timeToExpiry : 0.00001,
                       riskFreeRate: 0.02,
                       volatility: (pos.greeks?.vega || 0) * 2 // simplified IV update
                   }, pos.optionType);
                   
                   // simplified price update based on delta
                   const priceChange = (newPrice - (basePortfolio.positions.find(p => p.symbol === symbol)?.marketPrice || newPrice)) * (pos.greeks?.delta || 0);
                   newMarketPrice = pos.marketPrice + priceChange / pos.quantity;
                   
                   pos.greeks = newGreeks;
               }
               
               const marketValue = newMarketPrice * pos.quantity;
               const unrealizedPnl = (newMarketPrice - pos.avgCost) * pos.quantity;
               
               return { ...pos, marketPrice: newMarketPrice, marketValue, unrealizedPnl };
            }
            return pos;
          });
        }
      } catch (err) {
        console.error(`Failed to emulate price for ${symbol}`, err);
        // In case of AI error, just do a random walk
         updatedPositions = updatedPositions.map(pos => {
            if (pos.underlying === symbol || pos.symbol === symbol) {
                const randomFactor = 1 + (Math.random() - 0.5) * 0.01;
                const newMarketPrice = pos.marketPrice * randomFactor;
                const marketValue = newMarketPrice * pos.quantity;
                const unrealizedPnl = (newMarketPrice - pos.avgCost) * pos.quantity;
                return {...pos, marketPrice: newMarketPrice, marketValue, unrealizedPnl};
            }
            return pos;
        });
      }
    }
    
    updatedPositions.forEach(pos => {
        totalMarketValue += pos.marketValue;
        totalUnrealizedPnl += pos.unrealizedPnl;
    });

    const totalValue = basePortfolio.cash + totalMarketValue;
    updatedPositions = updatedPositions.map(pos => ({
        ...pos,
        portfolioAllocation: (pos.marketValue / totalValue) * 100
    }));

    setPortfolio(prev => prev ? {
        ...prev,
        positions: updatedPositions,
        totalValue: totalValue,
        totalPnL: prev.realizedPnl + totalUnrealizedPnl,
        timestamp: new Date().toISOString()
    } : null);

  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isLive && portfolio) {
      const basePortfolio = getPortfolioById(DEFAULT_PORTFOLIO_ID);
      if(basePortfolio) {
        intervalId = setInterval(() => {
          updatePortfolioData(basePortfolio);
        }, 3000); // Update every 3 seconds
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLive, portfolio, updatePortfolioData]);
  
  const value = useMemo(() => ({
    isLive,
    toggleLive,
    portfolio,
    isLoading,
    error,
  }), [isLive, toggleLive, portfolio, isLoading, error]);

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};
