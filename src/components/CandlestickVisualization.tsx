
import React from 'react';
import { OHLCV, formatNumber } from '../utils/candlestickUtils';

interface CandlestickVisualizationProps {
  candle: OHLCV;
}

const CandlestickVisualization: React.FC<CandlestickVisualizationProps> = ({ candle }) => {
  const isBullish = candle.close > candle.open;
  const candleColor = isBullish ? 'bg-chart-up' : 'bg-chart-down';
  const wickColor = 'bg-chart-wick';
  
  // Calculate the range to determine visualization heights
  const priceRange = candle.high - candle.low;
  const bodyHeight = Math.abs(candle.close - candle.open) / priceRange * 100;
  const bodyTop = ((candle.high - Math.max(candle.open, candle.close)) / priceRange) * 100;
  const topWickHeight = ((candle.high - Math.max(candle.open, candle.close)) / priceRange) * 100;
  const bottomWickHeight = ((Math.min(candle.open, candle.close) - candle.low) / priceRange) * 100;
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-8">OHLCV Candlestick</h2>
      
      <div className="h-60 w-20 flex flex-col items-center justify-center relative">
        {/* Top price */}
        <div className="absolute -top-8 left-full ml-2 text-sm">
          High: {formatNumber(candle.high)}
        </div>
        
        {/* Bottom price */}
        <div className="absolute -bottom-8 left-full ml-2 text-sm">
          Low: {formatNumber(candle.low)}
        </div>
        
        {/* Open price */}
        <div className={`absolute text-xs left-full ml-2 ${isBullish ? 'top-[25%]' : 'bottom-[30%]'}`}>
          Open: {formatNumber(candle.open)}
        </div>
        
        {/* Close price */}
        <div className={`absolute text-xs left-full ml-2 ${isBullish ? 'bottom-[25%]' : 'top-[30%]'}`}>
          Close: {formatNumber(candle.close)}
        </div>
        
        {/* Upper wick */}
        <div 
          className={`w-0.5 ${wickColor}`} 
          style={{ 
            height: `${topWickHeight}%`,
            position: 'absolute',
            top: 0
          }}
        ></div>
        
        {/* Body */}
        <div 
          className={`w-5 ${candleColor}`} 
          style={{ 
            height: `${bodyHeight}%`,
            position: 'absolute',
            top: `${bodyTop}%`
          }}
        ></div>
        
        {/* Lower wick */}
        <div 
          className={`w-0.5 ${wickColor}`} 
          style={{ 
            height: `${bottomWickHeight}%`,
            position: 'absolute',
            bottom: 0
          }}
        ></div>
      </div>
      
      {/* Volume bar */}
      <div className="mt-4">
        <div className="h-4 bg-chart-volume" style={{ width: '50px' }}></div>
        <div className="text-xs mt-1">Volume: {formatNumber(candle.volume, 0)}</div>
      </div>
    </div>
  );
};

export default CandlestickVisualization;
