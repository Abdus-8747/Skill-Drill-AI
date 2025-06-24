import React from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200/50 backdrop-blur-[2px] sticky top-0 z-30 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        
        {/* Logo / Title */}
        <Link to="/">
          <h2 className="text-xl font-semibold text-gray-900">Skill Drill AI</h2>
        </Link>

        {/* Profile Component */}
        <ProfileInfoCard />
        
      </div>
    </div>
  );
};

export default Navbar;
