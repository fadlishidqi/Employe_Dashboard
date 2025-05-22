import React from 'react';
import { User, MapPin, Award, Briefcase, Calendar, BookOpen, Flag, Building, Users } from 'lucide-react';
import { Employee } from '../../data/employeesData';

interface ProfileDetailsProps {
  employee: Employee;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ employee }) => {
  const detailItems = [
    { icon: <User className="h-5 w-5 text-blue-600" />, label: 'Nama Lengkap', value: employee.nama },
    { icon: <Flag className="h-5 w-5 text-blue-600" />, label: 'Jenis Kelamin', value: employee.jenisKelamin },
    { icon: <Award className="h-5 w-5 text-blue-600" />, label: 'Cabang Olahraga', value: employee.cabangOlahraga },
    { icon: <Briefcase className="h-5 w-5 text-blue-600" />, label: 'NIP', value: employee.nip },
    { icon: <Calendar className="h-5 w-5 text-blue-600" />, label: 'Jabatan', value: employee.jabatan },
    { icon: <Users className="h-5 w-5 text-blue-600" />, label: 'Peran', value: employee.peran },
    { icon: <BookOpen className="h-5 w-5 text-blue-600" />, label: 'Sertifikasi', value: employee.sertifikasi },
    { icon: <MapPin className="h-5 w-5 text-blue-600" />, label: 'Domisili Saat Ini', value: employee.domisili },
    { icon: <MapPin className="h-5 w-5 text-blue-600" />, label: 'Propinsi', value: employee.propinsi },
    { icon: <Building className="h-5 w-5 text-blue-600" />, label: 'Tempat Melatih/Latihan', value: employee.tempatMelatih },
    { icon: <Users className="h-5 w-5 text-blue-600" />, label: 'Tim Yang Dilatih / Diikuti', value: employee.timDilatih },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-blue-800 text-white">
        <h2 className="text-xl font-semibold">Detail Informasi</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailItems.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-4 mt-1">{item.icon}</div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                <p className="mt-1 text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;