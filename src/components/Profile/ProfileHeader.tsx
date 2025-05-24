import React from 'react';
import { ArrowLeft, User, MapPin, Award, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../../hooks/useEmployees';

interface ProfileHeaderProps {
  employee: Employee;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ employee }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 h-32 md:h-48 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
      </div>
      
      <div className="px-4 sm:px-6 pb-6 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-16 sm:-mt-20">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
            {employee.avatar_url ? (
              <img 
                src={employee.avatar_url} 
                alt={employee.nama} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                <User className="h-16 w-16 text-blue-500" />
              </div>
            )}
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{employee.nama}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-gray-600 gap-2 sm:gap-4">
              <div className="flex items-center justify-center sm:justify-start">
                <Briefcase className="h-4 w-4 mr-1 text-blue-600" />
                <span>{employee.jabatan}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Award className="h-4 w-4 mr-1 text-yellow-600" />
                <span>{employee.peran}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <MapPin className="h-4 w-4 mr-1 text-red-600" />
                <span>{employee.propinsi}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;