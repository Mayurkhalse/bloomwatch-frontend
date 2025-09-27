import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { getSeverityColor } from '../../utils/helpers';
import { BloomEvent } from '../../data/mockData';

interface BloomMarkerProps {
  bloom: BloomEvent;
  onShowDetails: (bloom: BloomEvent) => void;
}

const BloomMarker: React.FC<BloomMarkerProps> = ({ bloom, onShowDetails }) => {
  // Create custom icon based on severity
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

  return (
    <Marker
      position={bloom.coordinates}
      icon={createCustomIcon(bloom.severity)}
    >
      <Popup>
        <div className="p-3">
          <h3 className="font-semibold text-lg mb-2">Bloom Event</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Severity:</strong> {bloom.severity}</p>
            <p><strong>Chlorophyll:</strong> {bloom.chlorophyll} mg/m³</p>
            <p><strong>Affected Area:</strong> {bloom.affectedArea} km²</p>
            <p><strong>Date:</strong> {bloom.date}</p>
          </div>
          <button
            onClick={() => onShowDetails(bloom)}
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