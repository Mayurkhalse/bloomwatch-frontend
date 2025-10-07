import React from 'react';
import { Map, BarChart3, FileText, MessageSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { to: '/map', label: 'Live Map', icon: Map },
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/chatbot', label: 'Chatbot', icon: MessageSquare }, // 💬 Added Chatbot route
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-full bg-gray-900/95 backdrop-blur-md border-r border-gray-700 transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
