import React, { useState } from 'react';
import { Clock, Calendar, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks } from 'date-fns';

interface TimeEntry {
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  breaks: { start: string; end: string }[];
}

export default function TimeClock() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Mock time entries for the week
  const timeEntries: Record<string, TimeEntry> = {
    '2024-03-18': {
      date: '2024-03-18',
      clockIn: '09:00 AM',
      clockOut: '05:30 PM',
      totalHours: 8,
      breaks: [
        { start: '12:00 PM', end: '12:30 PM' }
      ]
    },
    '2024-03-19': {
      date: '2024-03-19',
      clockIn: '08:45 AM',
      clockOut: '05:15 PM',
      totalHours: 8,
      breaks: [
        { start: '12:15 PM', end: '12:45 PM' }
      ]
    }
    // Add more entries as needed
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(prev => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => addWeeks(prev, 1));
  };

  const handleDownloadReport = () => {
    // Implement report download logic
    console.log('Downloading time report...');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Time Clock</h2>
        <button
          onClick={handleDownloadReport}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">
                Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousWeek}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNextWeek}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clock In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clock Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Breaks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {daysInWeek.map((day) => {
                const entry = timeEntries[format(day, 'yyyy-MM-dd')];
                return (
                  <tr key={format(day, 'yyyy-MM-dd')}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(day, 'EEE, MMM d')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry?.clockIn || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry?.clockOut || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry?.breaks.map((b, i) => (
                        <div key={i}>
                          {b.start} - {b.end}
                        </div>
                      )) || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry?.totalHours || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">
                Total Hours This Week: 16
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Last Updated: {format(new Date(), 'MMM d, yyyy h:mm a')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}