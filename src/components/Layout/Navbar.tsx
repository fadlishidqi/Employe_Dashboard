import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BarChart2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2" onClick={() => navigate('/')} role="button">
            <Users className="h-6 w-6 text-yellow-400" />
            <span className="font-bold text-xl tracking-tight">SportStaff</span>
          </div>
          
          <nav>
            <ul className="flex items-center space-x-1">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  <span>Dashboard</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;