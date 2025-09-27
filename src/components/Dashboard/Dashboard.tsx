import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, MapPin } from 'lucide-react';
import { BloomEvent, Region } from '../../data/mockData';
import { getSeverityColor } from '../../utils/helpers';
import Charts from '../Common/Charts';
import ExportButtons from '../Common/ExportButtons';

interface DashboardProps {
  blooms: BloomEvent[];
  regions: Region[];
  selectedRegions: string[];
  onRegionToggle: (regionId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  blooms,
  regions,
  selectedRegions,
  onRegionToggle,
}) => {
  const totalBlooms = blooms.length;
  const severeBlooms = blooms.filter(b => b.severity === 'severe').length;
  const avgChlorophyll = blooms.reduce((sum, b) => sum + b.chlorophyll, 0) / blooms.length;
  const totalAffectedArea = blooms.reduce((sum, b) => sum + b.affectedArea, 0);

  const chartData = blooms.map(bloom => ({
    date: bloom.date,
    severity: bloom.severity === 'low' ? 1 : bloom.severity === 'moderate' ? 2 : bloom.severity === 'high' ? 3 : 4,
    chlorophyll: bloom.chlorophyll,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <ExportButtons data={blooms} filename="bloom-dashboard" />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Blooms</p>
              <p className="text-2xl font-bold text-white">{totalBlooms}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Severe Blooms</p>
              <p className="text-2xl font-bold text-red-400">{severeBlooms}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Chlorophyll</p>
              <p className="text-2xl font-bold text-green-400">{avgChlorophyll.toFixed(1)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Affected Area</p>
              <p className="text-2xl font-bold text-yellow-400">{totalAffectedArea.toFixed(0)} km²</p>
            </div>
            <MapPin className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Charts and Region Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Charts data={chartData} title="Bloom Trends Overview" type="area" />
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Selected Regions</h3>
          <div className="space-y-3">
            {regions.map((region) => (
              <div
                key={region.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedRegions.includes(region.id)
                    ? 'bg-blue-600 border border-blue-400'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => onRegionToggle(region.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{region.name}</p>
                    <p className="text-gray-400 text-sm">{region.bloomCount} blooms</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    region.riskLevel === 'high' ? 'bg-red-600 text-white' :
                    region.riskLevel === 'moderate' ? 'bg-yellow-600 text-white' :
                    'bg-green-600 text-white'
                  }`}>
                    {region.riskLevel.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bloom Events */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Bloom Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left text-gray-400 text-sm font-medium py-2">Location</th>
                <th className="text-left text-gray-400 text-sm font-medium py-2">Date</th>
                <th className="text-left text-gray-400 text-sm font-medium py-2">Severity</th>
                <th className="text-left text-gray-400 text-sm font-medium py-2">Chlorophyll</th>
                <th className="text-left text-gray-400 text-sm font-medium py-2">Area</th>
              </tr>
            </thead>
            <tbody>
              {blooms.slice(0, 5).map((bloom) => (
                <tr key={bloom.id} className="border-b border-gray-700">
                  <td className="py-3 text-white">
                    {bloom.coordinates[0].toFixed(2)}, {bloom.coordinates[1].toFixed(2)}
                  </td>
                  <td className="py-3 text-gray-300">{bloom.date}</td>
                  <td className="py-3">
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold text-white"
                      style={{ backgroundColor: getSeverityColor(bloom.severity) }}
                    >
                      {bloom.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300">{bloom.chlorophyll} mg/m³</td>
                  <td className="py-3 text-gray-300">{bloom.affectedArea} km²</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;