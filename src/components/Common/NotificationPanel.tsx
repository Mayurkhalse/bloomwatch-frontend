import React from 'react';
import { X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`fixed right-0 top-16 h-full bg-gray-900/95 backdrop-blur-md border-l border-gray-700 transition-all duration-300 z-40 ${
      isOpen ? 'w-96' : 'w-0 overflow-hidden'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-400">{unreadCount} unread</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="mb-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Mark all as read
          </button>
        )}

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                notification.read
                  ? 'bg-gray-800/50'
                  : 'bg-gray-700/50 border border-blue-500/30'
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{notification.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {formatDate(notification.timestamp)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;