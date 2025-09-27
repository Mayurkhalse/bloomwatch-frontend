import React from 'react';
import { Calendar, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface TimeSliderProps {
  currentDate: string;
  minDate: string;
  maxDate: string;
  isPlaying: boolean;
  onDateChange: (date: string) => void;
  onTogglePlay: () => void;
  onStepBackward: () => void;
  onStepForward: () => void;
}

const TimeSlider: React.FC<TimeSliderProps> = ({
  currentDate,
  minDate,
  maxDate,
  isPlaying,
  onDateChange,
  onTogglePlay,
  onStepBackward,
  onStepForward,
}) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <Calendar className="h-5 w-5 text-gray-400" />
        <div className="flex items-center space-x-2">
          <button
            onClick={onStepBackward}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={onTogglePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={onStepForward}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={50} // This would be calculated based on current date position
            onChange={(e) => {
              // Convert slider value back to date
              const percentage = parseInt(e.target.value);
              // Implementation would calculate date based on percentage
            }}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{minDate}</span>
            <span className="text-white font-medium">{currentDate}</span>
            <span>{maxDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;