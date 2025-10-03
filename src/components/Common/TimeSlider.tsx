import React, { useMemo } from 'react';
import { Calendar, SkipBack, SkipForward } from 'lucide-react';

interface TimeSliderProps {
  dates: string[]; // ISO yyyy-mm-dd
  currentDate: string; // ISO yyyy-mm-dd
  onDateChange: (date: string) => void;
}

function formatDisplayDate(isoDate: string): string {
  // Expecting yyyy-mm-dd, output dd-mm-yyyy
  const [y, m, d] = isoDate.split('-');
  if (!y || !m || !d) return isoDate;
  return `${d}-${m}-${y}`;
}

const TimeSlider: React.FC<TimeSliderProps> = ({ dates, currentDate, onDateChange }) => {
  const index = useMemo(() => Math.max(0, dates.indexOf(currentDate)), [dates, currentDate]);
  const minLabel = dates.length > 0 ? formatDisplayDate(dates[0]) : '';
  const maxLabel = dates.length > 0 ? formatDisplayDate(dates[dates.length - 1]) : '';

  const stepBackward = () => {
    if (dates.length === 0) return;
    const nextIndex = Math.max(0, index - 1);
    onDateChange(dates[nextIndex]);
  };

  const stepForward = () => {
    if (dates.length === 0) return;
    const nextIndex = Math.min(dates.length - 1, index + 1);
    onDateChange(dates[nextIndex]);
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <Calendar className="h-5 w-5 text-gray-400" />
        <div className="flex items-center space-x-2">
          <button
            onClick={stepBackward}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Previous date"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={stepForward}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Next date"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={Math.max(0, dates.length - 1)}
            value={index}
            onChange={(e) => {
              const newIndex = Number(e.target.value);
              if (!Number.isFinite(newIndex)) return;
              const clamped = Math.min(Math.max(newIndex, 0), Math.max(0, dates.length - 1));
              onDateChange(dates[clamped]);
            }}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{minLabel}</span>
            <span className="text-white font-medium">{formatDisplayDate(currentDate)}</span>
            <span>{maxLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;