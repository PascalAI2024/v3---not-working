import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User, HelpCircle } from 'lucide-react';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, we would clear auth state/tokens here
    navigate('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
          alt="User avatar"
          className="w-8 h-8 rounded-full border-2 border-gray-700"
        />
        <span className="text-gray-200">Sarah Connor</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => {}}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => {}}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          
          <button
            onClick={() => {}}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
          
          <hr className="my-1" />
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}