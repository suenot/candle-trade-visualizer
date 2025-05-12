import React from 'react';
import { CANDLESTICK_PRESETS, PresetKey } from '../utils/candlestickUtils';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useTranslation } from '../contexts/LanguageContext';

interface CandlestickPresetSelectorProps {
  onSelectPreset: (preset: PresetKey) => void;
  selectedPreset: PresetKey;
}

const CandlestickPresetSelector: React.FC<CandlestickPresetSelectorProps> = ({
  onSelectPreset,
  selectedPreset
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-lg font-bold mb-2">{t('presets.title')}</h2>
      <div className={`flex flex-wrap gap-2 ${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
        {Object.keys(CANDLESTICK_PRESETS).map((preset) => (
          <Button
            key={preset}
            variant={selectedPreset === preset ? "default" : "outline"}
            className="text-sm whitespace-nowrap"
            onClick={() => onSelectPreset(preset as PresetKey)}
          >
            {CANDLESTICK_PRESETS[preset as PresetKey].name}
          </Button>
        ))}
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        {CANDLESTICK_PRESETS[selectedPreset].description}
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="candlesticks">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.what')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>
                Candlesticks are a visualization tool that represents price movements over a specific time period. 
                Each candle contains OHLCV data:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>O (Open)</strong> - the opening price of the period</li>
                <li><strong>H (High)</strong> - the highest price reached during the period</li>
                <li><strong>L (Low)</strong> - the lowest price reached during the period</li>
                <li><strong>C (Close)</strong> - the closing price of the period</li>
                <li><strong>V (Volume)</strong> - the total trading volume during the period</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="structure">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.structure')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>
                Candles aggregate individual trades during a specific timeframe into a single visual element:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Real Body</strong> - the rectangle showing the difference between opening and closing prices</li>
                <li><strong>Color</strong> - typically green for bullish candles (close &gt; open) and red for bearish candles (close &lt; open)</li>
                <li><strong>Shadows/Wicks</strong> - lines extending above and below the body showing the high and low prices</li>
                <li><strong>Upper Shadow</strong> - line from the top of the body to the highest price</li>
                <li><strong>Lower Shadow</strong> - line from the bottom of the body to the lowest price</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="timeframes">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.timeframes')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>
                The time interval for which candles and OHLCV data are formed. Common timeframes include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>m1, m5, m15, m30</strong> - 1, 5, 15, 30 minutes</li>
                <li><strong>h1, h4</strong> - 1, 4 hours</li>
                <li><strong>d1</strong> - 1 day</li>
                <li><strong>w1</strong> - 1 week</li>
                <li><strong>M1</strong> - 1 month</li>
              </ul>
              <p className="mt-2">
                Shorter timeframes (like m1, m5) show more detail but can contain more market noise, 
                while longer timeframes (like d1, w1, M1) show broader market trends.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="patterns">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.patterns')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>
                Specific combinations of candles that may indicate potential trend reversals or continuations:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Bullish Engulfing</strong> - a reversal pattern where a bullish candle completely engulfs the previous bearish candle</li>
                <li><strong>Hammer</strong> - a potential signal for a downtrend reversal, characterized by a small body and a long lower shadow</li>
                <li><strong>Doji</strong> - a candle with a very small body, indicating market indecision</li>
                <li><strong>Shooting Star</strong> - a bearish reversal pattern with a small body and a long upper shadow</li>
                <li><strong>Morning Star</strong> - a three-candle pattern indicating a potential bullish reversal</li>
                <li><strong>Evening Star</strong> - a three-candle pattern indicating a potential bearish reversal</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="advanced-concepts">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.advanced')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">Trading Volume</h4>
              <p>
                Volume is often displayed as a histogram below the candlestick chart, providing insight into market activity:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>High volume during price movements can indicate stronger trend strength</li>
                <li>Low volume may suggest weak conviction behind price movements</li>
                <li>Volume spikes often occur at trend reversals or breakouts</li>
              </ul>
              
              <h4 className="font-semibold mt-2">Multiple Timeframe Analysis</h4>
              <p>
                Professional traders often analyze multiple timeframes simultaneously:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Higher timeframes to identify the overall trend direction</li>
                <li>Middle timeframes to spot potential entry and exit zones</li>
                <li>Lower timeframes for precise entry and exit execution</li>
              </ul>
              
              <h4 className="font-semibold mt-2">Price Action Trading</h4>
              <p>
                A methodology focused on analyzing pure price movements through candlestick patterns without indicators:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Support and resistance levels</li>
                <li>Market structure (higher highs, lower lows)</li>
                <li>Trend lines and channels</li>
                <li>Chart patterns (head and shoulders, triangles, flags)</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CandlestickPresetSelector;
