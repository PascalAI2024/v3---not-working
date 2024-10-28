import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, UserCircle, Clock, Settings, Users, BarChart2, FileText,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const agentNavigation = [
  { name: 'Dialer', icon: Phone, href: '/agent' },
  { name: 'Profile', icon: UserCircle, href: '/agent/profile' },
  { name: 'Time Clock', icon: Clock, href: '/agent/time' },
];

const adminNavigation = [
  { name: 'Dashboard', icon: BarChart2, href: '/admin' },
  { name: 'Campaigns', icon: Phone, href: '/admin/campaigns' },
  { name: 'Agents', icon: Users, href: '/admin/agents' },
  { name: 'Reports', icon: FileText, href: '/admin/reports' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAdmin = location.pathname.startsWith('/admin');
  const navigation = isAdmin ? adminNavigation : agentNavigation;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full bg-gray-900">
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          {!isCollapsed && (
            <Link to="/" className="text-xl font-bold text-white">
              ViciNext
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg text-gray-400 hover:bg-gray-700 ${
              isCollapsed ? 'mx-auto' : ''
            }`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-2 py-2 rounded-lg transition-colors ${
                location.pathname === item.href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3">Logout</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}