import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
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

  // Flatten historical and predicted trends for chart
  const chartData = blooms.flatMap(bloom =>
    [
      ...bloom.historicalTrends.map(trend => ({
        date: trend.date,
        severity: trend.severity,
        evi: trend.evi,
        ndvi: trend.ndvi,
      })),
      ...bloom.predictedTrends.map(trend => ({
        date: trend.date,
        severity: trend.severity,
        evi: trend.evi,
        ndvi: trend.ndvi,
      })),
    ]
  );

  // Calculate average EVI and NDVI using latest record per bloom
  const avgEVI = blooms.reduce((sum, b) => {
    const latestHistorical = b.historicalTrends[b.historicalTrends.length - 1];
    const latestPredicted = b.predictedTrends[b.predictedTrends.length - 1];
    const evi = latestPredicted?.evi ?? latestHistorical?.evi ?? 0;
    return sum + evi;
  }, 0) / blooms.length;

  const avgNDVI = blooms.reduce((sum, b) => {
    const latestHistorical = b.historicalTrends[b.historicalTrends.length - 1];
    const latestPredicted = b.predictedTrends[b.predictedTrends.length - 1];
    const ndvi = latestPredicted?.ndvi ?? latestHistorical?.ndvi ?? 0;
    return sum + ndvi;
  }, 0) / blooms.length;

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
              <p className="text-gray-400 text-sm">Average EVI</p>
              <p className="text-2xl font-bold text-cyan-400">{avgEVI.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-cyan-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average NDVI</p>
              <p className="text-2xl font-bold text-blue-400">{avgNDVI.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Charts and Region Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Charts
  data={chartData}
  title="Bloom Trends Overview"
  type="area"
  keys={['severity', 'evi', 'ndvi']}
/>


        
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
                <th className="text-left text-gray-400 text-sm font-medium py-2">EVI</th>
                <th className="text-left text-gray-400 text-sm font-medium py-2">NDVI</th>
              </tr>
            </thead>
            <tbody>
              {blooms.slice(0, 5).map(bloom => {
                const latestHistorical = bloom.historicalTrends[bloom.historicalTrends.length - 1];
                const latestPredicted = bloom.predictedTrends[bloom.predictedTrends.length - 1];
                const evi = latestPredicted?.evi ?? latestHistorical?.evi ?? 0;
                const ndvi = latestPredicted?.ndvi ?? latestHistorical?.ndvi ?? 0;
                return (
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
                        {bloom.severity}
                      </span>
                    </td>
                    <td className="py-3 text-gray-300">{evi.toFixed(2)}</td>
                    <td className="py-3 text-gray-300">{ndvi.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
