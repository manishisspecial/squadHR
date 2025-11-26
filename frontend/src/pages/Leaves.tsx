import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import { Plus, Calendar, X, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Leaves = () => {
  const { user } = useAuthStore();
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'CASUAL_LEAVE',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const endpoint = user?.role === 'ADMIN' || user?.role === 'HR' 
        ? '/leaves' 
        : '/leaves/my-leaves';
      const response = await api.get(endpoint);
      setLeaves(response.data.leaves || []);
    } catch (error) {
      console.error('Failed to fetch leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/leaves', formData);
      setShowForm(false);
      setFormData({ type: 'CASUAL_LEAVE', startDate: '', endDate: '', reason: '' });
      fetchLeaves();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to apply leave');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this leave?`)) return;
    
    try {
      await api.put(`/leaves/${id}/status`, { status });
      fetchLeaves();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'HR' || user?.role === 'MANAGER';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading leaves...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leaves</h1>
          <p className="mt-1 text-gray-600">Manage leave requests and approvals</p>
        </div>
        {!isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Apply Leave</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 animate-scaleIn">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Apply for Leave</h2>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              >
                <option value="SICK_LEAVE">Sick Leave</option>
                <option value="CASUAL_LEAVE">Casual Leave</option>
                <option value="EARNED_LEAVE">Earned Leave</option>
                <option value="MATERNITY_LEAVE">Maternity Leave</option>
                <option value="PATERNITY_LEAVE">Paternity Leave</option>
                <option value="COMP_OFF">Comp Off</option>
                <option value="LOP">Loss of Pay</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                rows={3}
                placeholder="Enter reason for leave..."
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {leaves.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No leaves found"
          description={isAdmin ? "No leave requests have been submitted yet." : "You haven't applied for any leaves yet."}
          action={!isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Apply for Leave
            </button>
          )}
        />
      ) : (
        <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {isAdmin && (
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Employee
                    </th>
                  )}
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Dates
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Days
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Status
                  </th>
                  {isAdmin && (
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaves.map((leave, index) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-gray-50 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {isAdmin && (
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {leave.employee?.firstName} {leave.employee?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{leave.employee?.employeeId}</div>
                      </td>
                    )}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">
                        {leave.type.replace(/_/g, ' ').toLowerCase()}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(leave.startDate), 'MMM dd')}
                      </div>
                      <div className="text-xs text-gray-500">
                        to {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{leave.days} days</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          leave.status === 'APPROVED'
                            ? 'bg-green-100 text-green-800'
                            : leave.status === 'REJECTED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {leave.status === 'APPROVED' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {leave.status === 'REJECTED' && <XCircle className="h-3 w-3 mr-1" />}
                        {leave.status === 'PENDING' && <Clock className="h-3 w-3 mr-1" />}
                        {leave.status}
                      </span>
                    </td>
                    {isAdmin && leave.status === 'PENDING' && (
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleStatusUpdate(leave.id, 'APPROVED')}
                            className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(leave.id, 'REJECTED')}
                            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
