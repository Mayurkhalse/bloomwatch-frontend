export interface BloomEvent {
  id: string;
  coordinates: [number, number];
  severity: 'low' | 'moderate' | 'high' | 'severe';
  chlorophyll: number;
  affectedArea: number;
  date: string;
  predictedDate?: string;
  historicalTrends: { date: string; severity: number; chlorophyll: number }[];
  predictedTrends: { date: string; severity: number; chlorophyll: number }[];
}

export interface Region {
  id: string;
  name: string;
  coordinates: [number, number];
  riskLevel: 'low' | 'moderate' | 'high';
  bloomCount: number;
}

export const mockBloomEvents: BloomEvent[] = [
  {
    id: '1',
    coordinates: [37.7749, -122.4194],
    severity: 'high',
    chlorophyll: 45.2,
    affectedArea: 125.5,
    date: '2024-01-15',
    historicalTrends: [
      { date: '2024-01-01', severity: 2, chlorophyll: 25.0 },
      { date: '2024-01-05', severity: 3, chlorophyll: 35.0 },
      { date: '2024-01-10', severity: 4, chlorophyll: 42.0 },
      { date: '2024-01-15', severity: 4, chlorophyll: 45.2 },
    ],
    predictedTrends: [
      { date: '2024-01-20', severity: 3, chlorophyll: 38.0 },
      { date: '2024-01-25', severity: 2, chlorophyll: 28.0 },
      { date: '2024-01-30', severity: 1, chlorophyll: 18.0 },
    ],
  },
  {
    id: '2',
    coordinates: [40.7128, -74.0060],
    severity: 'moderate',
    chlorophyll: 28.7,
    affectedArea: 78.3,
    date: '2024-01-12',
    historicalTrends: [
      { date: '2024-01-01', severity: 1, chlorophyll: 15.0 },
      { date: '2024-01-05', severity: 2, chlorophyll: 22.0 },
      { date: '2024-01-10', severity: 3, chlorophyll: 26.0 },
      { date: '2024-01-12', severity: 3, chlorophyll: 28.7 },
    ],
    predictedTrends: [
      { date: '2024-01-17', severity: 2, chlorophyll: 24.0 },
      { date: '2024-01-22', severity: 2, chlorophyll: 20.0 },
      { date: '2024-01-27', severity: 1, chlorophyll: 16.0 },
    ],
  },
  {
    id: '3',
    coordinates: [34.0522, -118.2437],
    severity: 'severe',
    chlorophyll: 58.9,
    affectedArea: 203.7,
    date: '2024-01-18',
    historicalTrends: [
      { date: '2024-01-01', severity: 3, chlorophyll: 32.0 },
      { date: '2024-01-06', severity: 4, chlorophyll: 45.0 },
      { date: '2024-01-12', severity: 4, chlorophyll: 52.0 },
      { date: '2024-01-18', severity: 5, chlorophyll: 58.9 },
    ],
    predictedTrends: [
      { date: '2024-01-23', severity: 4, chlorophyll: 48.0 },
      { date: '2024-01-28', severity: 3, chlorophyll: 35.0 },
      { date: '2024-02-02', severity: 2, chlorophyll: 25.0 },
    ],
  },
  {
    id: '4',
    coordinates: [32.0522, -116.2437],
    severity: 'severe',
    chlorophyll: 54.9,
    affectedArea: 23.7,
    date: '2024-01-18',
    historicalTrends: [
      { date: '2024-01-01', severity: 3, chlorophyll: 32.0 },
      { date: '2024-01-06', severity: 4, chlorophyll: 45.0 },
      { date: '2024-01-12', severity: 4, chlorophyll: 52.0 },
      { date: '2024-01-18', severity: 5, chlorophyll: 58.9 },
    ],
    predictedTrends: [
      { date: '2024-01-23', severity: 4, chlorophyll: 48.0 },
      { date: '2024-01-28', severity: 3, chlorophyll: 35.0 },
      { date: '2024-02-02', severity: 2, chlorophyll: 25.0 },
    ],
  },
  {
    id: '5',
    coordinates: [32.22, -116.37],
    severity: 'severe',
    chlorophyll: 54.9,
    affectedArea: 23.7,
    date: '2024-01-18',
    historicalTrends: [
      { date: '2024-01-01', severity: 3, chlorophyll: 32.0 },
      { date: '2024-01-06', severity: 4, chlorophyll: 45.0 },
      { date: '2024-01-12', severity: 4, chlorophyll: 52.0 },
      { date: '2024-01-18', severity: 5, chlorophyll: 58.9 },
    ],
    predictedTrends: [
      { date: '2024-01-23', severity: 4, chlorophyll: 48.0 },
      { date: '2024-01-28', severity: 3, chlorophyll: 35.0 },
      { date: '2024-02-02', severity: 2, chlorophyll: 25.0 },
    ],
  }
];

export const mockRegions: Region[] = [
  { id: '1', name: 'San Francisco Bay', coordinates: [37.7749, -122.4194], riskLevel: 'high', bloomCount: 12 },
  { id: '2', name: 'New York Harbor', coordinates: [40.7128, -74.0060], riskLevel: 'moderate', bloomCount: 8 },
  { id: '3', name: 'Los Angeles Coast', coordinates: [34.0522, -118.2437], riskLevel: 'high', bloomCount: 15 },
  { id: '4', name: 'Miami Beach', coordinates: [25.7617, -80.1918], riskLevel: 'low', bloomCount: 3 },
];

export const mockNotifications = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'High Bloom Risk Alert',
    message: 'Severe bloom detected in San Francisco Bay area',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'info' as const,
    title: 'Weekly Report Available',
    message: 'Your weekly bloom summary is ready for download',
    timestamp: '2024-01-14T08:00:00Z',
    read: true,
  },
  {
    id: '3',
    type: 'success' as const,
    title: 'Bloom Cleared',
    message: 'Los Angeles Coast bloom has returned to normal levels',
    timestamp: '2024-01-13T14:20:00Z',
    read: false,
  },
];