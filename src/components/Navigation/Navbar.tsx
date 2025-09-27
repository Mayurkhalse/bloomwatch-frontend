import React from 'react';
import { Menu, Bell, User, LogOut, Settings } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  onToggleNotifications: () => void;
  onLogout: () => void;
  user: { name: string; email: string } | null;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onToggleNotifications, onLogout, user }) => {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BW</span>
            </div>
            <h1 className="text-xl font-bold text-white">Bloom Watch</h1>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleNotifications}
              className="relative text-gray-400 hover:text-white transition-colors"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-white font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-300" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;