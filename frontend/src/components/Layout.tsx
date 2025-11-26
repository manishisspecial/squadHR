import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Star,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Employees', roles: ['ADMIN', 'HR'] },
    { path: '/leaves', icon: Calendar, label: 'Leaves' },
    { path: '/attendance', icon: Clock, label: 'Attendance' },
    { path: '/payroll', icon: DollarSign, label: 'Payroll' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/reviews', icon: Star, label: 'Reviews' },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role || '')
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary-600">SquadHR</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-30 flex-col transition-transform duration-300`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-200 p-6 animate-slideIn">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SquadHR
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {filteredMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200 animate-fadeIn ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <Link
              to="/profile"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive('/profile')
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <User className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Profile</span>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
            <div className="mt-4 px-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.employee?.firstName} {user?.employee?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate mt-1">{user?.email}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive('/profile')
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <User className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Profile</span>
            </Link>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
            <div className="mt-4 px-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                {user?.employee?.firstName} {user?.employee?.lastName}
              </p>
              <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 animate-fadeIn">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
