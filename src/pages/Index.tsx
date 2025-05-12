
import React, { useState, useEffect } from 'react';
import { 
  CANDLESTICK_PRESETS, 
  PresetKey, 
  OHLCV, 
  Trade, 
  generateTrades 
} from '../utils/candlestickUtils';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import CandlestickPresetSelector from '../components/CandlestickPresetSelector';
import CandlestickVisualization from '../components/CandlestickVisualization';
import CandleDataCSV from '../components/CandleDataCSV';
import TradesDataCSV from '../components/TradesDataCSV';

const Index = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('bullish');
  const [candle, setCandle] = useState<OHLCV>(CANDLESTICK_PRESETS.bullish.generator());
  const [trades, setTrades] = useState<Trade[]>([]);

  // Generate new candle and trades when preset changes
  useEffect(() => {
    const newCandle = CANDLESTICK_PRESETS[selectedPreset].generator();
    const newTrades = generateTrades(newCandle);
    
    setCandle(newCandle);
    setTrades(newTrades);
  }, [selectedPreset]);

  // Handle preset selection
  const handleSelectPreset = (preset: PresetKey) => {
    setSelectedPreset(preset);
  };

  // Generate new data with the current preset
  const handleRegenerateData = () => {
    const newCandle = CANDLESTICK_PRESETS[selectedPreset].generator();
    const newTrades = generateTrades(newCandle);
    
    setCandle(newCandle);
    setTrades(newTrades);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2">OHLCV Candlestick Demo</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Learn how candlesticks are formed from individual trades
      </p>
      
      <div className="mb-6">
        <CandlestickPresetSelector 
          onSelectPreset={handleSelectPreset} 
          selectedPreset={selectedPreset} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Candlestick visualization */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <CandlestickVisualization candle={candle} />
              <Separator className="my-6" />
              <CandleDataCSV candle={candle} />
            </div>
          </CardContent>
        </Card>
        
        {/* Right side: Trades data */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Individual Trades</h2>
                <button 
                  onClick={handleRegenerateData}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  Regenerate Data
                </button>
              </div>
              <p className="text-muted-foreground mb-4">
                These are the 10 individual trades that form the OHLCV candlestick. 
                The first trade is at the open price, and the last trade is at the close price.
              </p>
              <TradesDataCSV trades={trades} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
