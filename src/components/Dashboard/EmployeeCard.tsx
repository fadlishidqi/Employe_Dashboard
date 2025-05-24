import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Award, User, ArrowRight } from 'lucide-react';
import { Employee } from '../../hooks/useEmployees';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${employee.id}`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Pelatih': return 'bg-blue-100 text-blue-800';
      case 'Ast. Pelatih': return 'bg-green-100 text-green-800';
      case 'Wasit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {employee.avatar_url ? (
              <img
                src={employee.avatar_url}
                alt={employee.nama}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {employee.nama}
            </h3>
            <p className="text-sm text-gray-500">{employee.nip}</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>

      {/* Role and Sport */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(employee.peran)}`}>
          {employee.peran}
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          {employee.cabang_olahraga}
        </span>
      </div>

      {/* Position */}
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <Award className="w-4 h-4 mr-2" />
        {employee.jabatan}
      </div>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <MapPin className="w-4 h-4 mr-2" />
        {employee.domisili}, {employee.propinsi}
      </div>

      {/* Bottom Info */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Tim: {employee.tim_dilatih}</span>
          <span className="text-blue-600 font-medium">Lihat Detail</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;