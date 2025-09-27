import React from 'react';
import { Map, BarChart3, Settings, FileText, Download } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'map', label: 'Live Map', icon: Map },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'exports', label: 'Exports', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-full bg-gray-900/95 backdrop-blur-md border-r border-gray-700 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-0 overflow-hidden'
    }`}>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;