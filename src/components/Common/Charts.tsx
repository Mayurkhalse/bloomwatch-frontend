import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartData {
  date: string;
  severity: number;
  chlorophyll: number;
}

interface ChartsProps {
  data: ChartData[];
  title: string;
  type?: 'line' | 'area';
}

const Charts: React.FC<ChartsProps> = ({ data, title, type = 'line' }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
          <p className="text-white text-sm">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'chlorophyll' ? ' mg/m³' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="severity"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="chlorophyll"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="severity"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="chlorophyll"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;