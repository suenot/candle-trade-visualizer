
import React from 'react';
import { CANDLESTICK_PRESETS, PresetKey } from '../utils/candlestickUtils';
import { Button } from './ui/button';

interface CandlestickPresetSelectorProps {
  onSelectPreset: (preset: PresetKey) => void;
  selectedPreset: PresetKey;
}

const CandlestickPresetSelector: React.FC<CandlestickPresetSelectorProps> = ({
  onSelectPreset,
  selectedPreset
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-bold mb-2">Candlestick Presets</h2>
      <div className="flex flex-wrap gap-2">
        {Object.keys(CANDLESTICK_PRESETS).map((preset) => (
          <Button
            key={preset}
            variant={selectedPreset === preset ? "default" : "outline"}
            className="text-sm"
            onClick={() => onSelectPreset(preset as PresetKey)}
          >
            {CANDLESTICK_PRESETS[preset as PresetKey].name}
          </Button>
        ))}
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        {CANDLESTICK_PRESETS[selectedPreset].description}
      </div>
    </div>
  );
};

export default CandlestickPresetSelector;
