import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents } from 'react-leaflet';
import { MAP_CENTER, MAP_ZOOM } from '../../utils/constants';
import BloomMarker from './BloomMarker';
import 'leaflet/dist/leaflet.css';
import { BloomEvent } from '../../data/mockData';

interface BloomMapProps {
  onShowBloomDetails: (bloom: BloomEvent) => void;
  userRegion: {
    bounds: [[number, number], [number, number]] | null;
    isDrawing: boolean;
    isEditing: boolean;
  };
  onRegionDrawn: (bounds: [[number, number], [number, number]]) => void;
  onStopDrawing: () => void;
  uid: string;
}

// Helper to validate bounds
const isValidBounds = (bounds: [[number, number], [number, number]] | null) => {
  if (!bounds) return false;
  return bounds.every(([lat, lng]) => typeof lat === 'number' && !isNaN(lat) && typeof lng === 'number' && !isNaN(lng));
};

// Map drawing handler
const MapDrawingHandler: React.FC<{
  isDrawing: boolean;
  onRegionDrawn: (bounds: [[number, number], [number, number]]) => void;
  onStopDrawing: () => void;
  onPreviewUpdate?: (bounds: [[number, number], [number, number]] | null) => void;
}> = ({ isDrawing, onRegionDrawn, onStopDrawing, onPreviewUpdate }) => {
  const drawingRef = useRef<{ startPoint: [number, number] | null; isDragging: boolean }>({ startPoint: null, isDragging: false });

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

        const bounds: [[number, number], [number, number]] = [
          [Math.min(startPoint[0], currentPoint[0]), Math.min(startPoint[1], currentPoint[1])],
          [Math.max(startPoint[0], currentPoint[0]), Math.max(startPoint[1], currentPoint[1])],
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

        const latDiff = Math.abs(startPoint[0] - endPoint[0]);
        const lngDiff = Math.abs(startPoint[1] - endPoint[1]);

        if (latDiff > 0.01 || lngDiff > 0.01) {
          const bounds: [[number, number], [number, number]] = [
            [Math.min(startPoint[0], endPoint[0]), Math.min(startPoint[1], endPoint[1])],
            [Math.max(startPoint[0], endPoint[0]), Math.max(startPoint[1], endPoint[1])],
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
    },
  });

  return null;
};

const BloomMap: React.FC<BloomMapProps> = ({ onShowBloomDetails, userRegion, onRegionDrawn, onStopDrawing, uid }) => {
  const [previewBounds, setPreviewBounds] = useState<[[number, number], [number, number]] | null>(null);
  const [bloomEvents, setBloomEvents] = useState<BloomEvent[]>([]);

  // Fetch saved bloom data
  useEffect(() => {
    const fetchSavedRegion = async () => {
      if (!uid) return;

      try {
        const response = await fetch(`https://bloomwatch-backend.onrender.com/getData?uid=${uid}`);
        const data = await response.json();

        if (data.region_data) {
          const blooms: BloomEvent[] = data.region_data.map((bloom: any) => ({
            id: bloom.id,
            coordinates: bloom.coordinates,
            severity: bloom.severityLabel || 'Unknown',
            date: bloom.date,
            historicalTrends: bloom.historicalTrends || [],
            predictedTrends: bloom.predictedTrends || [],
            affectedArea: bloom.affectedArea || 0,
          }));

          setBloomEvents(blooms);

          // Set map bounds to fit all markers
          const latList = blooms.map(b => b.coordinates[0]);
          const lngList = blooms.map(b => b.coordinates[1]);
          if (latList.length && lngList.length) {
            const bounds: [[number, number], [number, number]] = [
              [Math.min(...latList), Math.min(...lngList)],
              [Math.max(...latList), Math.max(...lngList)],
            ];
            onRegionDrawn(bounds);
          }
        }
      } catch (err) {
        console.error('Failed to fetch bloom data:', err);
      }
    };

    fetchSavedRegion();
  }, [uid]);

  // Escape key to cancel drawing
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
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        minZoom={3}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
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
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles © Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
          noWrap
        />

        <MapDrawingHandler
          isDrawing={userRegion.isDrawing}
          onRegionDrawn={onRegionDrawn}
          onStopDrawing={onStopDrawing}
          onPreviewUpdate={setPreviewBounds}
        />

        {/* Preview rectangle */}
        {isValidBounds(previewBounds) && (
          <Rectangle
            bounds={previewBounds!}
            pathOptions={{ color: '#60a5fa', weight: 2, fillColor: '#60a5fa', fillOpacity: 0.2, dashArray: '5,5' }}
          />
        )}

        {/* User's selected region */}
        {isValidBounds(userRegion.bounds) && (
          <Rectangle
            bounds={userRegion.bounds!}
            pathOptions={{
              color: userRegion.isEditing ? '#f59e0b' : '#3b82f6',
              weight: 2,
              fillColor: userRegion.isEditing ? '#f59e0b' : '#3b82f6',
              fillOpacity: 0.1,
              dashArray: userRegion.isEditing ? '5,5' : undefined,
            }}
          />
        )}

        {/* Bloom markers */}
        {bloomEvents.map((bloom) => (
          <BloomMarker key={bloom.id} bloom={bloom} onShowDetails={onShowBloomDetails} />
        ))}
      </MapContainer>
    </div>
  );
};

export default BloomMap;
