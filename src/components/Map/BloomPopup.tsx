import React from 'react';
import { X, MapPin, Clock, Droplets, Activity } from 'lucide-react';
import { BloomEvent } from '../../data/mockData';
import { getSeverityColor, formatDate } from '../../utils/helpers';
import Charts from '../Common/Charts';

interface BloomPopupProps {
  bloom: BloomEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const BloomPopup: React.FC<BloomPopupProps> = ({ bloom, isOpen, onClose }) => {
  if (!bloom || !isOpen) return null;

  const combinedData = [
    ...bloom.historicalTrends,
    ...bloom.predictedTrends,
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Bloom Event Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300">
                      {bloom.coordinates[0].toFixed(4)}, {bloom.coordinates[1].toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">{formatDate(bloom.date)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5" style={{ color: getSeverityColor(bloom.severity) }} />
                    <span className="text-gray-300 capitalize">{bloom.severity} Severity</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-5 w-5 text-cyan-400" />
                    <span className="text-gray-300">{bloom.chlorophyll} mg/m³ Chlorophyll</span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Impact Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">{bloom.affectedArea}</p>
                    <p className="text-sm text-gray-400">km² Affected</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">{bloom.chlorophyll}</p>
                    <p className="text-sm text-gray-400">mg/m³ Chlorophyll</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="space-y-4">
              <Charts
                data={combinedData}
                title="Trend Analysis"
                type="line"
              />
            </div>
          </div>

          {/* Historical and Predicted Trends */}
          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Historical Data</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {bloom.historicalTrends.map((trend, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
                      <span className="text-gray-300 text-sm">{formatDate(trend.date)}</span>
                      <div className="flex space-x-4">
                        <span className="text-blue-400 text-sm">S: {trend.severity}</span>
                        <span className="text-green-400 text-sm">C: {trend.chlorophyll}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Predictions</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {bloom.predictedTrends.map((trend, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
                      <span className="text-gray-300 text-sm">{formatDate(trend.date)}</span>
                      <div className="flex space-x-4">
                        <span className="text-blue-400 text-sm">S: {trend.severity}</span>
                        <span className="text-green-400 text-sm">C: {trend.chlorophyll}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloomPopup;