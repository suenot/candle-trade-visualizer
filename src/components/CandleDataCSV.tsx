
import React from 'react';
import { OHLCV, formatNumber, formatDate } from '../utils/candlestickUtils';

interface CandleDataCSVProps {
  candle: OHLCV;
}

const CandleDataCSV: React.FC<CandleDataCSVProps> = ({ candle }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Candlestick Data (CSV)</h3>
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-card border border-border rounded-md">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Open</th>
              <th className="px-4 py-2 text-left">High</th>
              <th className="px-4 py-2 text-left">Low</th>
              <th className="px-4 py-2 text-left">Close</th>
              <th className="px-4 py-2 text-left">Volume</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">{formatDate(candle.timestamp)}</td>
              <td className="px-4 py-2">{formatNumber(candle.open)}</td>
              <td className="px-4 py-2">{formatNumber(candle.high)}</td>
              <td className="px-4 py-2">{formatNumber(candle.low)}</td>
              <td className="px-4 py-2">{formatNumber(candle.close)}</td>
              <td className="px-4 py-2">{formatNumber(candle.volume, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandleDataCSV;
