import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddLeadModal from './addlead';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLeadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Title and subtitle */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
            <p className="text-gray-600 text-sm mt-1">Manage and track your leads</p>
          </div>
          
          {/* Right side - Add Lead button */}
          <button 
            onClick={handleAddLeadClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-colors duration-150 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>
        <AddLeadModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>

      {/* Add Lead Modal */}
      {/* <AddLeadModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </>
  );
};

export default Header;