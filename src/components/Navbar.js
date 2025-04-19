
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">💰 Crypto Tracker</h1>
      <div className="flex items-center gap-4">
        <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
          USD
        </button>
        {/* Add currency switch, login, or theme toggle here */}
      </div>
    </nav>
  );
};

export default Navbar;
