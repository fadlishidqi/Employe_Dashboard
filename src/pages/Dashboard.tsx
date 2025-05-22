import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import SearchFilter from '../components/Dashboard/SearchFilter';
import EmployeeTable from '../components/Dashboard/EmployeeTable';
import EmployeeForm from '../components/Dashboard/EmployeeForm';
import { useEmployees } from '../hooks/useEmployees';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { employees, loading, createEmployee } = useEmployees();

  const handleCreateEmployee = async (employeeData: any) => {
    await createEmployee(employeeData);
    setShowForm(false);
  };

  return (
    <div>
      <Toaster position="top-right" />
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Karyawan</h1>
          <p className="text-gray-600">Kelola dan lihat informasi detail karyawan olahraga</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Tambah Karyawan
        </button>
      </div>
      
      <SearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      ) : (
        <EmployeeTable 
          employees={employees}
          searchTerm={searchTerm}
        />
      )}

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