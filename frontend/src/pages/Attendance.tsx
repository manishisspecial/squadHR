import { useEffect, useState } from 'react';
import api from '../utils/api';
import { LogIn, LogOut } from 'lucide-react';
import { format } from 'date-fns';

const Attendance = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
    fetchTodayAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await api.get('/attendance/my-attendance', {
        params: { limit: 30 },
      });
      setAttendance(response.data.attendances || []);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayAttendance = async () => {
    try {
      const response = await api.get('/attendance/my-attendance', {
        params: { limit: 1 },
      });
      if (response.data.attendances?.[0]) {
        const today = new Date();
        const recordDate = new Date(response.data.attendances[0].date);
        if (today.toDateString() === recordDate.toDateString()) {
          setTodayAttendance(response.data.attendances[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch today attendance:', error);
    }
  };

  const handleClockIn = async () => {
    try {
      await api.post('/attendance/clock-in');
      fetchTodayAttendance();
      fetchAttendance();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to clock in');
    }
  };

  const handleClockOut = async () => {
    try {
      await api.post('/attendance/clock-out', { breakDuration: 0 });
      fetchTodayAttendance();
      fetchAttendance();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to clock out');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Attendance</h1>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Today's Attendance</h2>
        {todayAttendance ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clock In</p>
                <p className="text-lg font-semibold">
                  {todayAttendance.clockIn
                    ? format(new Date(todayAttendance.clockIn), 'hh:mm a')
                    : 'Not clocked in'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Clock Out</p>
                <p className="text-lg font-semibold">
                  {todayAttendance.clockOut
                    ? format(new Date(todayAttendance.clockOut), 'hh:mm a')
                    : 'Not clocked out'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-lg font-semibold">
                  {todayAttendance.totalHours?.toFixed(2) || '0.00'} hrs
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!todayAttendance.clockIn && (
                <button
                  onClick={handleClockIn}
                  className="flex items-center space-x-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Clock In</span>
                </button>
              )}
              {todayAttendance.clockIn && !todayAttendance.clockOut && (
                <button
                  onClick={handleClockOut}
                  className="flex items-center space-x-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Clock Out</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-600">No attendance record for today</p>
            <button
              onClick={handleClockIn}
              className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <LogIn className="h-5 w-5" />
              <span>Clock In</span>
            </button>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold">Attendance History</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Clock In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Clock Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendance.map((record) => (
              <tr key={record.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {format(new Date(record.date), 'MMM dd, yyyy')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {record.clockIn ? format(new Date(record.clockIn), 'hh:mm a') : '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {record.clockOut ? format(new Date(record.clockOut), 'hh:mm a') : '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {record.totalHours?.toFixed(2) || '0.00'} hrs
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      record.status === 'PRESENT'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'ABSENT'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;

