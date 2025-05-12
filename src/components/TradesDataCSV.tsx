
import React from 'react';
import { Trade, formatNumber, formatDate } from '../utils/candlestickUtils';

interface TradesDataCSVProps {
  trades: Trade[];
}

const TradesDataCSV: React.FC<TradesDataCSVProps> = ({ trades }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Generated Trades Data (CSV)</h3>
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-card border border-border rounded-md">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Volume</th>
              <th className="px-4 py-2 text-left">Side</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                <td className="px-4 py-1 text-xs">{formatDate(trade.timestamp)}</td>
                <td className={`px-4 py-1 ${trade.side === 'buy' ? 'text-chart-up' : 'text-chart-down'}`}>
                  {formatNumber(trade.price)}
                </td>
                <td className="px-4 py-1">{formatNumber(trade.volume, 2)}</td>
                <td className={`px-4 py-1 font-medium ${trade.side === 'buy' ? 'text-chart-up' : 'text-chart-down'}`}>
                  {trade.side.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesDataCSV;
