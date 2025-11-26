import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import { Users, Calendar, Clock, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setError(null);
        const endpoint = user?.role === 'ADMIN' || user?.role === 'HR' 
          ? '/dashboard/admin' 
          : '/dashboard/employee';
        const response = await api.get(endpoint);
        setDashboardData(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to load dashboard data');
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboard();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (user?.role === 'ADMIN' || user?.role === 'HR') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={dashboardData?.stats?.totalEmployees || 0}
            icon={Users}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Active Employees"
            value={dashboardData?.stats?.activeEmployees || 0}
            icon={Users}
            color="green"
            delay={0.1}
          />
          <StatCard
            title="Pending Leaves"
            value={dashboardData?.stats?.pendingLeaves || 0}
            icon={Calendar}
            color="yellow"
            delay={0.2}
          />
          <StatCard
            title="Today's Attendance"
            value={dashboardData?.stats?.todayAttendance || 0}
            icon={Clock}
            color="purple"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 card-hover animate-scaleIn">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Department Statistics
            </h2>
            <div className="space-y-4">
              {dashboardData?.departmentStats?.length > 0 ? (
                dashboardData.departmentStats.map((dept: any, index: number) => (
                  <div
                    key={dept.department}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-gray-700 font-medium">{dept.department || 'Unassigned'}</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                      {dept.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No department data available</p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 card-hover animate-scaleIn">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Leave Status
            </h2>
            <div className="space-y-4">
              {dashboardData?.leaveStats?.length > 0 ? (
                dashboardData.leaveStats.map((stat: any, index: number) => (
                  <div
                    key={stat.status}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-gray-700 font-medium capitalize">{stat.status.toLowerCase()}</span>
                    <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
                      stat.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      stat.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {stat.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No leave data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back, {user?.employee?.firstName}!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Leaves"
          value={dashboardData?.stats?.pendingLeaves || 0}
          icon={Calendar}
          color="yellow"
          delay={0}
        />
        <StatCard
          title="Approved Leaves"
          value={dashboardData?.stats?.approvedLeaves || 0}
          icon={Calendar}
          color="green"
          delay={0.1}
        />
        <StatCard
          title="Work Days (Month)"
          value={dashboardData?.stats?.totalWorkDays || 0}
          icon={Clock}
          color="blue"
          delay={0.2}
        />
        <StatCard
          title="Total Hours (Month)"
          value={dashboardData?.stats?.totalHours?.toFixed(1) || '0.0'}
          icon={TrendingUp}
          color="purple"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 card-hover animate-scaleIn">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Today's Attendance
            </h2>
          {dashboardData?.todayAttendance ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <span className="text-gray-700 font-medium">Clock In</span>
                <span className="font-semibold text-green-700">
                  {new Date(dashboardData.todayAttendance.clockIn).toLocaleTimeString()}
                </span>
              </div>
              {dashboardData.todayAttendance.clockOut && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <span className="text-gray-700 font-medium">Clock Out</span>
                  <span className="font-semibold text-blue-700">
                    {new Date(dashboardData.todayAttendance.clockOut).toLocaleTimeString()}
                  </span>
                </div>
              )}
              {dashboardData.todayAttendance.totalHours && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                  <span className="text-gray-700 font-medium">Total Hours</span>
                  <span className="font-semibold text-purple-700">
                    {dashboardData.todayAttendance.totalHours.toFixed(2)} hrs
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No attendance record for today</p>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 card-hover animate-scaleIn">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              Recent Payrolls
            </h2>
          <div className="space-y-3">
            {dashboardData?.recentPayrolls?.length > 0 ? (
              dashboardData.recentPayrolls.map((payroll: any, index: number) => (
                <div
                  key={payroll.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <span className="text-gray-600 text-sm">Period</span>
                    <p className="font-semibold text-gray-900">
                      {payroll.month}/{payroll.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600 text-sm">Net Salary</span>
                    <p className="font-bold text-blue-700 text-lg">
                      ${payroll.netSalary.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No payroll records yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, delay = 0 }: any) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div
      className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 card-hover animate-scaleIn relative overflow-hidden"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -mr-16 -mt-16" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`rounded-xl p-3 ${colors.bg}`}>
            <Icon className={`h-6 w-6 ${colors.text}`} />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
