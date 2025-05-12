import React from 'react';
import { Trade, formatNumber, formatDate } from '../utils/candlestickUtils';
import { useTranslation } from '../contexts/LanguageContext';

interface TradesDataCSVProps {
  trades: Trade[];
}

const TradesDataCSV: React.FC<TradesDataCSVProps> = ({ trades }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">{t('trades.data')}</h3>
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-card border border-border rounded-md">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2 text-left">{t('candle.timestamp')}</th>
              <th className="px-4 py-2 text-left">{t('trades.price')}</th>
              <th className="px-4 py-2 text-left">{t('candle.volume')}</th>
              <th className="px-4 py-2 text-left">{t('trades.side')}</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                <td className="px-4 py-1 text-xs">{formatDate(trade.timestamp)}</td>
                <td className={`px-4 py-1 ${trade.side === 'buy' ? 'text-chart-up' : 'text-chart-down'}`}>{formatNumber(trade.price)}</td>
                <td className="px-4 py-1">{formatNumber(trade.volume, 2)}</td>
                <td className={`px-4 py-1 font-medium ${trade.side === 'buy' ? 'text-chart-up' : 'text-chart-down'}`}>{t(`trades.${trade.side}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesDataCSV;
