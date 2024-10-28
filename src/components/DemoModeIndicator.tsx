import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DemoModeIndicator() {
  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
      <AlertCircle className="h-5 w-5" />
      <span className="font-medium">Demo Mode</span>
    </div>
  );
}