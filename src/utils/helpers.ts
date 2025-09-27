import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch {
    return dateString;
  }
};

export const getSeverityColor = (severity: string): string => {
  const colors = {
    low: '#22c55e',
    moderate: '#f59e0b',
    high: '#ef4444',
    severe: '#dc2626',
  };
  return colors[severity as keyof typeof colors] || '#6b7280';
};

export const exportToJSON = (data: any, filename: string): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${filename}.json`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]).join(',');
  const csvContent = data.map(row => 
    Object.values(row).map(val => 
      typeof val === 'string' ? `"${val}"` : val
    ).join(',')
  ).join('\n');
  
  const csv = `${headers}\n${csvContent}`;
  const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', `${filename}.csv`);
  linkElement.click();
};