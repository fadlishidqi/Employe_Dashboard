import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileDetails from '../components/Profile/ProfileDetails';
import { employees } from '../data/employeesData';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employee = employees.find(emp => emp.id === Number(id));

  if (!employee) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <ProfileHeader employee={employee} />
      <ProfileDetails employee={employee} />
    </div>
  );
};

export default Profile;