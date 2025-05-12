import React from 'react';
import { getCandlestickPresets, PresetKey } from '../utils/candlestickUtils';
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
  const CANDLESTICK_PRESETS = getCandlestickPresets(t);
  
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
              <p>{t('accordion.what.text1')}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t('accordion.what.list1')}</li>
                <li>{t('accordion.what.list2')}</li>
                <li>{t('accordion.what.list3')}</li>
                <li>{t('accordion.what.list4')}</li>
                <li>{t('accordion.what.list5')}</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="structure">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.structure')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>{t('accordion.structure.text1')}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t('accordion.structure.list1')}</li>
                <li>{t('accordion.structure.list2')}</li>
                <li>{t('accordion.structure.list3')}</li>
                <li>{t('accordion.structure.list4')}</li>
                <li>{t('accordion.structure.list5')}</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="timeframes">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.timeframes')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>{t('accordion.timeframes.text1')}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t('accordion.timeframes.list1')}</li>
                <li>{t('accordion.timeframes.list2')}</li>
                <li>{t('accordion.timeframes.list3')}</li>
                <li>{t('accordion.timeframes.list4')}</li>
                <li>{t('accordion.timeframes.list5')}</li>
              </ul>
              <p className="mt-2">{t('accordion.timeframes.text2')}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="patterns">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.patterns')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p>{t('accordion.patterns.text1')}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t('accordion.patterns.list1')}</li>
                <li>{t('accordion.patterns.list2')}</li>
                <li>{t('accordion.patterns.list3')}</li>
                <li>{t('accordion.patterns.list4')}</li>
                <li>{t('accordion.patterns.list5')}</li>
                <li>{t('accordion.patterns.list6')}</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="advanced-concepts">
          <AccordionTrigger className="text-md font-semibold">{t('accordion.advanced')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">{t('accordion.advanced.tradingVolume.title')}</h4>
              <p>{t('accordion.advanced.tradingVolume.text')}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t('accordion.advanced.tradingVolume.list1')}</li>
                <li>{t('accordion.advanced.tradingVolume.list2')}</li>
                <li>{t('accordion.advanced.tradingVolume.list3')}</li>
              </ul>
              <h4 className="font-semibold mt-2">{t('accordion.advanced.multipleTimeframe.title')}</h4>
              <p>{t('accordion.advanced.multipleTimeframe.text')}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t('accordion.advanced.multipleTimeframe.list1')}</li>
                <li>{t('accordion.advanced.multipleTimeframe.list2')}</li>
                <li>{t('accordion.advanced.multipleTimeframe.list3')}</li>
              </ul>
              <h4 className="font-semibold mt-2">{t('accordion.advanced.priceAction.title')}</h4>
              <p>{t('accordion.advanced.priceAction.text')}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{t('accordion.advanced.priceAction.list1')}</li>
                <li>{t('accordion.advanced.priceAction.list2')}</li>
                <li>{t('accordion.advanced.priceAction.list3')}</li>
                <li>{t('accordion.advanced.priceAction.list4')}</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CandlestickPresetSelector;
