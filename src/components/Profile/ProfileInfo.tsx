import React from 'react';
import { 
  User, 
  Award, 
  MapPin, 
  Building, 
  Users, 
  BookOpen,
  Target,
  Calendar,
  Flag
} from 'lucide-react';
import { Employee } from '../../hooks/useEmployees';

interface ProfileInfoProps {
  employee: Employee;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ employee }) => {
  const infoSections = [
    {
      title: 'Informasi Personal',
      items: [
        { icon: User, label: 'Nama Lengkap', value: employee.nama },
        { icon: Flag, label: 'Jenis Kelamin', value: employee.jenis_kelamin },
        { icon: Calendar, label: 'NIP', value: employee.nip },
      ]
    },
    {
      title: 'Informasi Profesional',
      items: [
        { icon: Award, label: 'Cabang Olahraga', value: employee.cabang_olahraga },
        { icon: Target, label: 'Jabatan', value: employee.jabatan },
        { icon: Users, label: 'Peran', value: employee.peran },
        { icon: BookOpen, label: 'Sertifikasi', value: employee.sertifikasi },
      ]
    },
    {
      title: 'Lokasi & Penugasan',
      items: [
        { icon: MapPin, label: 'Domisili', value: employee.domisili },
        { icon: MapPin, label: 'Provinsi', value: employee.propinsi },
        { icon: Building, label: 'Tempat Melatih', value: employee.tempat_melatih },
        { icon: Users, label: 'Tim yang Dilatih', value: employee.tim_dilatih },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {infoSections.map((section, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
                    <p className="text-base text-gray-900 font-medium">{item.value || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfo;