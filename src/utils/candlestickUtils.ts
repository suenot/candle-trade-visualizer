import { useTranslation } from '../contexts/LanguageContext';

// Types for OHLCV data and trades
export interface OHLCV {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: Date;
}

export interface Trade {
  price: number;
  volume: number;
  timestamp: Date;
  side: 'buy' | 'sell';
}

// Preset candlestick patterns
export const getCandlestickPresets = (t: (key: string) => string) => ({
  bullish: {
    name: t('preset.bullish.name'),
    description: t('preset.bullish.desc'),
    generator: (): OHLCV => {
      const open = 100;
      const close = 110;
      const low = open - Math.random() * 5;
      const high = close + Math.random() * 5;
      const volume = 1000 + Math.random() * 500;
      return {
        open,
        high,
        low,
        close,
        volume,
        timestamp: new Date()
      };
    }
  },
  bearish: {
    name: t('preset.bearish.name'),
    description: t('preset.bearish.desc'),
    generator: (): OHLCV => {
      const open = 100;
      const close = 90;
      const high = open + Math.random() * 5;
      const low = close - Math.random() * 5;
      const volume = 1000 + Math.random() * 500;
      return {
        open,
        high,
        low,
        close,
        volume,
        timestamp: new Date()
      };
    }
  },
  doji: {
    name: t('preset.doji.name'),
    description: t('preset.doji.desc'),
    generator: (): OHLCV => {
      const open = 100;
      const close = 100 + (Math.random() * 0.4 - 0.2);
      const high = open + 5 + Math.random() * 2;
      const low = open - 5 - Math.random() * 2;
      const volume = 1000 + Math.random() * 500;
      return {
        open,
        high,
        low,
        close,
        volume,
        timestamp: new Date()
      };
    }
  },
  hammer: {
    name: t('preset.hammer.name'),
    description: t('preset.hammer.desc'),
    generator: (): OHLCV => {
      const open = 100;
      const close = 101.5;
      const high = close + Math.random() * 1.5;
      const low = open - 8 - Math.random() * 3;
      const volume = 1200 + Math.random() * 300;
      return {
        open,
        high,
        low,
        close,
        volume,
        timestamp: new Date()
      };
    }
  },
  shootingStar: {
    name: t('preset.shootingStar.name'),
    description: t('preset.shootingStar.desc'),
    generator: (): OHLCV => {
      const open = 100;
      const close = 98.5;
      const high = open + 8 + Math.random() * 3;
      const low = close - Math.random() * 1.5;
      const volume = 1200 + Math.random() * 300;
      return {
        open,
        high,
        low,
        close,
        volume,
        timestamp: new Date()
      };
    }
  },
  engulfing: {
    name: t('preset.engulfing.name'),
    description: t('preset.engulfing.desc'),
    generator: (): OHLCV => {
      const open = 95;
      const close = 105;
      const high = close + Math.random() * 2;
      const low = open - Math.random() * 2;
      const volume = 1500 + Math.random() * 500;
      return {
        open,
        high,
        low,
        close,
        volume,
        timestamp: new Date()
      };
    }
  }
});

export type PresetKey = keyof ReturnType<typeof getCandlestickPresets>;

// Generate trades based on OHLCV data
export function generateTrades(candle: OHLCV): Trade[] {
  const trades: Trade[] = [];
  
  // The first trade is always at the open price
  trades.push({
    price: candle.open,
    volume: candle.volume * 0.1 * Math.random(),
    timestamp: new Date(candle.timestamp.getTime()),
    side: Math.random() > 0.5 ? 'buy' : 'sell'
  });
  
  // Generate 8 trades between open and close
  const priceRange = [candle.low, candle.high];
  const timeStep = 60000; // 1 minute between trades
  
  for (let i = 1; i < 9; i++) {
    // Generate a price between low and high with some randomness
    const price = priceRange[0] + Math.random() * (priceRange[1] - priceRange[0]);
    const volume = candle.volume * 0.05 * (1 + Math.random());
    const timestamp = new Date(candle.timestamp.getTime() + timeStep * i);
    
    trades.push({
      price,
      volume,
      timestamp,
      side: Math.random() > 0.5 ? 'buy' : 'sell'
    });
  }
  
  // The last trade is always at the close price
  trades.push({
    price: candle.close,
    volume: candle.volume * 0.1 * (1 + Math.random()),
    timestamp: new Date(candle.timestamp.getTime() + timeStep * 10),
    side: Math.random() > 0.5 ? 'buy' : 'sell'
  });
  
  return trades;
}

// Format a number to a fixed number of digits
export function formatNumber(num: number, digits = 2): string {
  return num.toFixed(digits);
}

// Format a date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString() + ' ' + 
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
