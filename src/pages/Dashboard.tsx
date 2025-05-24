import React, { useState } from 'react';
import { Plus, Search, Filter, Users, TrendingUp, Award, MapPin } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import EmployeeCard from '../components/Dashboard/EmployeeCard';
import EmployeeForm from '../components/Dashboard/EmployeeForm';
import { useEmployees } from '../hooks/useEmployees';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filterRole, setFilterRole] = useState('');
  const { employees, loading, createEmployee } = useEmployees();

  const handleCreateEmployee = async (employeeData: any) => {
    await createEmployee(employeeData);
    setShowForm(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = 
      employee.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.cabang_olahraga.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jabatan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = !filterRole || employee.peran === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const stats = [
    {
      label: 'Total Karyawan',
      value: employees.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Pelatih Aktif',
      value: employees.filter(emp => emp.peran === 'Pelatih').length,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      label: 'Cabang Olahraga',
      value: new Set(employees.map(emp => emp.cabang_olahraga)).size,
      icon: Award,
      color: 'bg-purple-500',
      change: '+3%'
    },
    {
      label: 'Provinsi',
      value: new Set(employees.map(emp => emp.propinsi)).size,
      icon: MapPin,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const roles = [...new Set(employees.map(emp => emp.peran))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Kelola dan pantau data karyawan olahraga
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Karyawan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change} dari bulan lalu</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari nama, cabang olahraga, atau jabatan..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Semua Peran</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Karyawan ({filteredEmployees.length})
          </h2>
          <div className="text-sm text-gray-500">
            {searchTerm && `Hasil pencarian untuk "${searchTerm}"`}
          </div>
        </div>

        {/* Employee Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada karyawan ditemukan</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 
                'Coba ubah kata kunci pencarian Anda' : 
                'Belum ada data karyawan yang tersedia'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Karyawan Pertama
              </button>
            )}
          </div>
        )}
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          onSubmit={handleCreateEmployee}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;