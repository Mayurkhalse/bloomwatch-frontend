import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { getSeverityColor } from '../../utils/helpers';
import { BloomEvent } from '../../data/mockData';

interface BloomMarkerProps {
  bloom: BloomEvent;
  onShowDetails: (bloom: BloomEvent) => void;
}

// Map numeric severity → string label
const getSeverityLabel = (value: number | string | undefined): 'low' | 'moderate' | 'high' | 'severe' => {
  if (typeof value === 'string') {
    // If it's already a label, return as-is if valid
    if (['low', 'moderate', 'high', 'severe'].includes(value)) return value as any;
    return 'low';
  }

  switch (value) {
    case 1:
      return 'low';
    case 2:
      return 'moderate';
    case 3:
      return 'high';
    case 4:
      return 'severe';
    default:
      return 'low';
  }
};

const BloomMarker: React.FC<BloomMarkerProps> = ({ bloom, onShowDetails }) => {
  // Get first day of current month
  const now = new Date();
const currentMonthFirstDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;


  // Find record for current month's first date
  const monthRecord =
    bloom.historicalTrends.find(r => r.date.startsWith(currentMonthFirstDate)) ||
    bloom.predictedTrends?.find(r => r.date.startsWith(currentMonthFirstDate));

  // Safely convert severity
  const severityLabel = getSeverityLabel(monthRecord?.severity);

  // Create transformed object
  const transformedBloom: BloomEvent = {
    ...bloom,
    date: currentMonthFirstDate,
    evi: monthRecord?.evi ?? 0,
    ndvi: monthRecord?.ndvi ?? 0,
    severity: severityLabel,
  };

  const createCustomIcon = (severity: string) => {
    const color = getSeverityColor(severity);
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}">
        <circle cx="12" cy="12" r="8" stroke="white" stroke-width="2"/>
      </svg>
    `;
    return new Icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(svgIcon),
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  };

  console.log("transformedBloom",transformedBloom);
  return (
    <Marker position={transformedBloom.coordinates} icon={createCustomIcon(transformedBloom.severity)}>
      <Popup>
        <div className="p-3">
          <h3 className="font-semibold text-lg mb-2">Bloom Event</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Severity:</strong> {transformedBloom.severity}</p>
            <p><strong>EVI:</strong> {transformedBloom.evi}</p>
            <p><strong>NDVI:</strong> {transformedBloom.ndvi}</p>
            <p><strong>Date:</strong> {transformedBloom.date}</p>
          </div>
          <button
            onClick={() => onShowDetails(transformedBloom)}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            View Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default BloomMarker;
