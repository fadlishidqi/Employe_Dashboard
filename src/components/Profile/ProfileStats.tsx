import React from 'react';
import { Calendar, Award, TrendingUp, Star } from 'lucide-react';
import { Employee } from '../../hooks/useEmployees';

interface ProfileStatsProps {
  employee: Employee;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ employee }) => {
  const stats = [
    {
      label: 'Pengalaman',
      value: '5+ Tahun',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Rating',
      value: '4.8/5.0',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Prestasi',
      value: '12 Medali',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Performa',
      value: 'Excellent',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentActivities = [
    {
      title: 'Menang Kompetisi Regional',
      date: '2 hari yang lalu',
      type: 'achievement'
    },
    {
      title: 'Sesi Latihan Tim A',
      date: '1 minggu yang lalu',
      type: 'training'
    },
    {
      title: 'Workshop Teknik Baru',
      date: '2 minggu yang lalu',
      type: 'workshop'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Statistik</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-sm font-medium text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'achievement' ? 'bg-green-500' :
                  activity.type === 'training' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
                </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Butuh bantuan?</h4>
          <p className="text-xs text-gray-600 mb-3">
            Hubungi {employee.nama} untuk informasi lebih lanjut
          </p>
          <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Kirim Pesan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;