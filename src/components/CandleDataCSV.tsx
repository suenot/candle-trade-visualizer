import React from 'react';
import { OHLCV, formatNumber, formatDate } from '../utils/candlestickUtils';
import { useTranslation } from '../contexts/LanguageContext';

interface CandleDataCSVProps {
  candle: OHLCV;
}

const CandleDataCSV: React.FC<CandleDataCSVProps> = ({ candle }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">{t('candle.data')}</h3>
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-card border border-border rounded-md">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2 text-left">{t('candle.timestamp')}</th>
              <th className="px-4 py-2 text-left">{t('candle.open')}</th>
              <th className="px-4 py-2 text-left">{t('candle.high')}</th>
              <th className="px-4 py-2 text-left">{t('candle.low')}</th>
              <th className="px-4 py-2 text-left">{t('candle.close')}</th>
              <th className="px-4 py-2 text-left">{t('candle.volume')}</th>
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
