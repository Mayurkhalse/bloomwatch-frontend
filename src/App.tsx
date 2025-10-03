import { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import BloomMap from './components/Map/BloomMap';
import BloomPopup from './components/Map/BloomPopup';
import Dashboard from './components/Dashboard/Dashboard';
import TimeSlider from './components/Common/TimeSlider';
import NotificationPanel from './components/Common/NotificationPanel';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import { mockBloomEvents, mockRegions, mockNotifications, BloomEvent } from './data/mockData';

function App() {
  // Authentication state
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  
  // Map and bloom state
  const [selectedBloom, setSelectedBloom] = useState<BloomEvent | null>(null);
  const [isBloomPopupOpen, setIsBloomPopupOpen] = useState(false);
  const [blooms] = useState(mockBloomEvents);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['1']);
  
  // Region selection state
  const [userRegion, setUserRegion] = useState<{
    bounds: [[number, number], [number, number]] | null;
    isDrawing: boolean;
    isEditing: boolean;
  }>({
    bounds: null,
    isDrawing: false,
    isEditing: false,
  });
  
  // Time slider state (manual only)
  const initialDate = useMemo(() => {
    const dates = mockBloomEvents.map(b => b.date).sort();
    return dates[0] ?? '2024-01-01';
  }, []);
  const [currentDate, setCurrentDate] = useState(initialDate);
  const availableDates = useMemo(() => {
    const unique = Array.from(new Set(blooms.map(b => b.date)));
    unique.sort();
    return unique;
  }, [blooms]);
  
  // Notification state
  const [notifications, setNotifications] = useState(mockNotifications);

  // Removed autoplay logic for manual-only slider

  const handleLogin = (email: string, _password: string) => {
    // Simulate login - in real app this would call an API
    setUser({ name: 'John Doe', email });
    setIsAuthenticated(true);
  };

  const handleSignup = (name: string, email: string, _password: string) => {
    // Simulate signup - in real app this would call an API
    setUser({ name, email });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleShowBloomDetails = (bloom: BloomEvent) => {
    setSelectedBloom(bloom);
    setIsBloomPopupOpen(true);
  };

  const handleRegionToggle = (regionId: string) => {
    setSelectedRegions(prev => 
      prev.includes(regionId)
        ? prev.filter(id => id !== regionId)
        : [...prev, regionId]
    );
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Region management functions
  const handleStartDrawing = () => {
    setUserRegion(prev => ({
      ...prev,
      isDrawing: true,
      isEditing: false,
    }));
  };

  const handleStopDrawing = () => {
    setUserRegion(prev => ({
      ...prev,
      isDrawing: false,
    }));
  };

  const handleRegionDrawn = (bounds: [[number, number], [number, number]]) => {
    setUserRegion(prev => ({
      ...prev,
      bounds,
      isDrawing: false,
    }));
  };

  const handleEditRegion = () => {
    setUserRegion(prev => ({
      ...prev,
      isEditing: !prev.isEditing,
    }));
  };

  const handleClearRegion = () => {
    setUserRegion({
      bounds: null,
      isDrawing: false,
      isEditing: false,
    });
  };

  // Filter blooms by selected date and user region
  const bloomsOnDate = useMemo(() => blooms.filter(b => b.date === currentDate), [blooms, currentDate]);
  const filteredBlooms = userRegion.bounds 
    ? bloomsOnDate.filter(bloom => {
        const [lat, lng] = bloom.coordinates;
        const [[minLat, minLng], [maxLat, maxLng]] = userRegion.bounds!;
        return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
      })
    : [];

  // Show authentication forms if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        {showLogin ? (
          <LoginForm
            onLogin={handleLogin}
            onToggleForm={() => setShowLogin(false)}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onToggleForm={() => setShowLogin(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleNotifications={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
        onLogout={handleLogout}
        user={user}
      />

      <Sidebar
        isOpen={isSidebarOpen}
      />

      <NotificationPanel
        notifications={notifications}
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        onMarkAsRead={handleMarkNotificationAsRead}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
      />

      <main className={`transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      } ${isNotificationPanelOpen ? 'mr-96' : 'mr-0'} mt-16`}>
        <Routes>
          <Route path="/" element={<Navigate to="/map" replace />} />
          <Route
            path="/map"
            element={(
              <div className="h-screen flex flex-col">
                <div className="flex-1 relative">
                  <BloomMap
                    blooms={filteredBlooms}
                    onShowBloomDetails={handleShowBloomDetails}
                    userRegion={userRegion}
                    onRegionDrawn={handleRegionDrawn}
                    onStopDrawing={handleStopDrawing}
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gray-800/90 backdrop-blur-md p-3 rounded-lg shadow-lg">
                      <div className="flex space-x-2">
                        <button
                          onClick={handleStartDrawing}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            userRegion.isDrawing
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {userRegion.isDrawing ? 'Drawing...' : 'Draw Region'}
                        </button>
                        {userRegion.isDrawing && (
                          <button
                            onClick={handleStopDrawing}
                            className="px-3 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        {userRegion.bounds && (
                          <>
                            <button
                              onClick={handleEditRegion}
                              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                userRegion.isEditing
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {userRegion.isEditing ? 'Editing...' : 'Edit'}
                            </button>
                            <button
                              onClick={handleClearRegion}
                              className="px-3 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                            >
                              Clear
                            </button>
                          </>
                        )}
                      </div>
                      {userRegion.isDrawing && (
                        <p className="text-xs text-blue-400 mt-2">
                          Click and drag to draw a rectangle on the map<br />
                          Press Escape to cancel
                        </p>
                      )}
                      {!userRegion.bounds && !userRegion.isDrawing && (
                        <p className="text-xs text-gray-400 mt-2">
                          Draw a region to view bloom data
                        </p>
                      )}
                      {userRegion.bounds && !userRegion.isDrawing && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-green-400">
                            Region active - {filteredBlooms.length} blooms visible
                          </p>
                          <p className="text-xs text-gray-500">
                            Bounds: {userRegion.bounds[0][0].toFixed(2)}, {userRegion.bounds[0][1].toFixed(2)} to {userRegion.bounds[1][0].toFixed(2)}, {userRegion.bounds[1][1].toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                  
                    <TimeSlider
                      dates={availableDates}
                      currentDate={currentDate}
                      onDateChange={setCurrentDate}
                    />
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            path="/dashboard"
            element={(
              <Dashboard
                blooms={filteredBlooms}
                regions={mockRegions}
                selectedRegions={selectedRegions}
                onRegionToggle={handleRegionToggle}
              />
            )}
          />
          <Route
            path="/reports"
            element={(
              <div className="p-6">
                <div className="bg-gray-800 p-12 rounded-lg shadow-lg text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Reports</h2>
                  <p className="text-gray-400">This section is ready for implementation with backend integration.</p>
                </div>
              </div>
            )}
          />
          <Route
            path="/exports"
            element={(
              <div className="p-6">
                <div className="bg-gray-800 p-12 rounded-lg shadow-lg text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Exports</h2>
                  <p className="text-gray-400">This section is ready for implementation with backend integration.</p>
                </div>
              </div>
            )}
          />
          <Route
            path="/settings"
            element={(
              <div className="p-6">
                <div className="bg-gray-800 p-12 rounded-lg shadow-lg text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
                  <p className="text-gray-400">This section is ready for implementation with backend integration.</p>
                </div>
              </div>
            )}
          />
          <Route path="*" element={<Navigate to="/map" replace />} />
        </Routes>
      </main>

      <BloomPopup
        bloom={selectedBloom}
        isOpen={isBloomPopupOpen}
        onClose={() => {
          setIsBloomPopupOpen(false);
          setSelectedBloom(null);
        }}
      />
    </div>
  );
}

export default App;