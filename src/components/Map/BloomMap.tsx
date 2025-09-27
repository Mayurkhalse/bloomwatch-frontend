import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents } from 'react-leaflet';
import { BloomEvent } from '../../data/mockData';
import { MAP_CENTER, MAP_ZOOM } from '../../utils/constants';
import BloomMarker from './BloomMarker';
import 'leaflet/dist/leaflet.css';

interface BloomMapProps {
  blooms: BloomEvent[];
  onShowBloomDetails: (bloom: BloomEvent) => void;
  userRegion: {
    bounds: [[number, number], [number, number]] | null;
    isDrawing: boolean;
    isEditing: boolean;
  };
  onRegionDrawn: (bounds: [[number, number], [number, number]]) => void;
  onStopDrawing: () => void;
}

// Component to handle map drawing events
const MapDrawingHandler: React.FC<{
  isDrawing: boolean;
  onRegionDrawn: (bounds: [[number, number], [number, number]]) => void;
  onStopDrawing: () => void;
  onPreviewUpdate?: (bounds: [[number, number], [number, number]] | null) => void;
}> = ({ isDrawing, onRegionDrawn, onStopDrawing, onPreviewUpdate }) => {
  const drawingRef = useRef<{
    startPoint: [number, number] | null;
    isDragging: boolean;
  }>({ startPoint: null, isDragging: false });

  useMapEvents({
    mousedown: (e) => {
      if (isDrawing) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        drawingRef.current.startPoint = [e.latlng.lat, e.latlng.lng];
        drawingRef.current.isDragging = true;
      }
    },
    mousemove: (e) => {
      if (isDrawing && drawingRef.current.isDragging && drawingRef.current.startPoint) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        const startPoint = drawingRef.current.startPoint;
        const currentPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
        
        // Create preview bounds
        const bounds: [[number, number], [number, number]] = [
          [Math.min(startPoint[0], currentPoint[0]), Math.min(startPoint[1], currentPoint[1])],
          [Math.max(startPoint[0], currentPoint[0]), Math.max(startPoint[1], currentPoint[1])]
        ];
        
        onPreviewUpdate?.(bounds);
      }
    },
    mouseup: (e) => {
      if (isDrawing && drawingRef.current.isDragging && drawingRef.current.startPoint) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        const startPoint = drawingRef.current.startPoint;
        const endPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
        
        // Only create region if there's meaningful distance between points
        const latDiff = Math.abs(startPoint[0] - endPoint[0]);
        const lngDiff = Math.abs(startPoint[1] - endPoint[1]);
        
        if (latDiff > 0.01 || lngDiff > 0.01) { // Minimum threshold for meaningful region
          // Create bounds from start and end points
          const bounds: [[number, number], [number, number]] = [
            [Math.min(startPoint[0], endPoint[0]), Math.min(startPoint[1], endPoint[1])],
            [Math.max(startPoint[0], endPoint[0]), Math.max(startPoint[1], endPoint[1])]
          ];
          
          onRegionDrawn(bounds);
        }
        
        onPreviewUpdate?.(null);
        drawingRef.current = { startPoint: null, isDragging: false };
      }
    },
    click: (e) => {
      if (isDrawing && !drawingRef.current.isDragging) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        onStopDrawing();
      }
    }
  });

  return null;
};

const BloomMap: React.FC<BloomMapProps> = ({ 
  blooms, 
  onShowBloomDetails, 
  userRegion, 
  onRegionDrawn, 
  onStopDrawing 
}) => {
  const [previewBounds, setPreviewBounds] = React.useState<[[number, number], [number, number]] | null>(null);

  // Handle Escape key to cancel drawing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && userRegion.isDrawing) {
        onStopDrawing();
        setPreviewBounds(null);
      }
    };

    if (userRegion.isDrawing) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [userRegion.isDrawing, onStopDrawing]);
  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        style={{ height: '100%', width: '100%' }}
        className={`z-10 ${userRegion.isDrawing ? 'cursor-crosshair' : ''}`}
        dragging={!userRegion.isDrawing}
        touchZoom={!userRegion.isDrawing}
        doubleClickZoom={!userRegion.isDrawing}
        scrollWheelZoom={!userRegion.isDrawing}
        boxZoom={!userRegion.isDrawing}
        keyboard={!userRegion.isDrawing}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Region drawing handler */}
        <MapDrawingHandler
          isDrawing={userRegion.isDrawing}
          onRegionDrawn={onRegionDrawn}
          onStopDrawing={onStopDrawing}
          onPreviewUpdate={setPreviewBounds}
        />
        
        {/* Preview rectangle while drawing */}
        {previewBounds && (
          <Rectangle
            bounds={previewBounds}
            pathOptions={{
              color: '#60a5fa',
              weight: 2,
              fillColor: '#60a5fa',
              fillOpacity: 0.2,
              dashArray: '5, 5',
            }}
          />
        )}
        
        {/* User's selected region */}
        {userRegion.bounds && (
          <Rectangle
            bounds={userRegion.bounds}
            pathOptions={{
              color: userRegion.isEditing ? '#f59e0b' : '#3b82f6',
              weight: 2,
              fillColor: userRegion.isEditing ? '#f59e0b' : '#3b82f6',
              fillOpacity: 0.1,
              dashArray: userRegion.isEditing ? '5, 5' : undefined,
            }}
          />
        )}
        
        {/* Bloom markers */}
        {blooms.map((bloom) => (
          <BloomMarker
            key={bloom.id}
            bloom={bloom}
            onShowDetails={onShowBloomDetails}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default BloomMap;