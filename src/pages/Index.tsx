
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
import { useIsMobile } from '../hooks/use-mobile';
import { useTranslation } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

const Index = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('bullish');
  const [candle, setCandle] = useState<OHLCV>(CANDLESTICK_PRESETS.bullish.generator());
  const [trades, setTrades] = useState<Trade[]>([]);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('page.title')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('page.subtitle')}
          </p>
        </div>
        <LanguageSelector />
      </div>
      
      <div className="mb-6">
        <CandlestickPresetSelector 
          onSelectPreset={handleSelectPreset} 
          selectedPreset={selectedPreset} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Candlestick visualization */}
        <Card>
          <CardContent className={`p-6 ${isMobile ? 'overflow-x-auto' : ''}`}>
            <div className="flex flex-col items-center">
              <div className={`${isMobile ? 'min-w-[300px]' : ''}`}>
                <CandlestickVisualization candle={candle} />
              </div>
              <Separator className="my-6" />
              <div className={`${isMobile ? 'overflow-x-auto w-full' : ''}`}>
                <CandleDataCSV candle={candle} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Right side: Trades data */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t('trades.title')}</h2>
                <button 
                  onClick={handleRegenerateData}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  {t('button.regenerate')}
                </button>
              </div>
              <p className="text-muted-foreground mb-4">
                {t('trades.description')}
              </p>
              <div className={`${isMobile ? 'overflow-x-auto w-full' : ''}`}>
                <TradesDataCSV trades={trades} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
