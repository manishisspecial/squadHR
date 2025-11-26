import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import { User, Mail, Building2, Briefcase, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null);
        const response = await api.get('/auth/profile');
        setProfile(response.data.user);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch profile');
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <p className="text-gray-600">{error || 'Profile not found'}</p>
        </div>
      </div>
    );
  }

  const employee = profile?.employee;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-gray-600">Manage your personal information</p>
        </div>
        <button className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <Edit2 className="h-4 w-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 card-hover animate-scaleIn">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {employee?.firstName} {employee?.lastName}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{employee?.employeeId}</p>
              <p className="mt-2 text-sm font-medium text-blue-600">{employee?.designation}</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                  {profile?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 animate-scaleIn">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </div>
                <p className="text-gray-900 font-medium">{profile?.email}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Role
                </div>
                <p className="text-gray-900 font-medium capitalize">{profile?.role}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Building2 className="h-4 w-4 mr-2" />
                  Department
                </div>
                <p className="text-gray-900 font-medium">{employee?.department || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Designation
                </div>
                <p className="text-gray-900 font-medium">{employee?.designation || 'N/A'}</p>
              </div>
              {employee?.phone && (
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </div>
                  <p className="text-gray-900 font-medium">{employee.phone}</p>
                </div>
              )}
              {employee?.joiningDate && (
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joining Date
                  </div>
                  <p className="text-gray-900 font-medium">
                    {new Date(employee.joiningDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>

            {employee?.address && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  Address
                </div>
                <div className="text-gray-900 space-y-1">
                  <p className="font-medium">{employee.address}</p>
                  {(employee.city || employee.state || employee.zipCode) && (
                    <p className="text-gray-600">
                      {[employee.city, employee.state, employee.zipCode].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {employee.country && <p className="text-gray-600">{employee.country}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
