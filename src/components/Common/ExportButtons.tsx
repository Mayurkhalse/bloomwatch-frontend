import React from 'react';
import { Download, FileImage, FileText, Database } from 'lucide-react';
import { exportToJSON, exportToCSV } from '../../utils/helpers';

interface ExportButtonsProps {
  data: any[];
  filename: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data, filename }) => {
  const handleExportJSON = () => {
    exportToJSON(data, filename);
  };

  const handleExportCSV = () => {
    exportToCSV(data, filename);
  };

  const handleExportPDF = () => {
    // PDF export would be implemented with a library like jsPDF
    alert('PDF export feature coming soon!');
  };

  const handleExportImage = () => {
    // Image export would capture the map/chart as image
    alert('Image export feature coming soon!');
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleExportJSON}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
      >
        <Database className="h-4 w-4" />
        <span>JSON</span>
      </button>
      
      <button
        onClick={handleExportCSV}
        className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>CSV</span>
      </button>
      
      
      
      
    </div>
  );
};

export default ExportButtons;