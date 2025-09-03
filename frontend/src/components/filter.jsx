import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [filterData, setFilterData] = useState({
    matchType: 'ALL',
    status: '',
    source: '',
    qualification: '',
    interestField: '',
    assignedTo: '',
    searchText: ''
  });

  const [additionalFilters, setAdditionalFilters] = useState([]);

  const handleInputChange = (field, value) => {
    setFilterData(prev => ({ ...prev, [field]: value }));
  };

  const handleMatchTypeChange = (type) => {
    setFilterData(prev => ({ ...prev, matchType: type }));
  };

  const addFilter = () => {
    setAdditionalFilters(prev => [...prev, { field: 'status', value: '' }]);
  };

  const removeFilter = (index) => {
    setAdditionalFilters(prev => prev.filter((_, i) => i !== index));
  };

  const updateAdditionalFilter = (index, field, value) => {
    setAdditionalFilters(prev => 
      prev.map((filter, i) => 
        i === index ? { ...filter, [field]: value } : filter
      )
    );
  };

  const handleApplyFilters = () => {
    const allFilters = {
      ...filterData,
      additionalFilters
    };
    
    if (onApplyFilters) {
      onApplyFilters(allFilters);
    }
    onClose();
  };

  const handleClearFilters = () => {
    setFilterData({
      matchType: 'ALL',
      status: '',
      source: '',
      qualification: '',
      interestField: '',
      assignedTo: '',
      searchText: ''
    });
    setAdditionalFilters([]);
  };

  if (!isOpen) return null;

  const statusOptions = ['New', 'Qualified', 'Follow-Up', 'Converted', 'Contacted'];
  const sourceOptions = ['Website', 'Social Media', 'Email Campaign', 'Cold Call', 'Referral', 'Advertisement', 'Event'];
  const qualificationOptions = ['High School', 'Diploma', 'Bachelor\'s', 'Master\'s', 'PhD', 'Other'];
  const interestFieldOptions = ['Web Development', 'Mobile App Development', 'Data Science', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'UI/UX Design', 'Digital Marketing'];
  const assignedToOptions = ['John Doe', 'Jane Smith', 'Emily Davis', 'Robert Johnson'];

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(3px)'
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Advanced Filters</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={filterData.searchText}
              onChange={(e) => handleInputChange('searchText', e.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Match Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Match</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="matchType"
                  value="ALL"
                  checked={filterData.matchType === 'ALL'}
                  onChange={() => handleMatchTypeChange('ALL')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">ALL conditions (AND)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="matchType"
                  value="ANY"
                  checked={filterData.matchType === 'ANY'}
                  onChange={() => handleMatchTypeChange('ANY')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">ANY condition (OR)</span>
              </label>
            </div>
          </div>

          {/* Filter Fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select
                  value={filterData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select status</option>
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <div className="relative">
                <select
                  value={filterData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select source</option>
                  {sourceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
              <div className="relative">
                <select
                  value={filterData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select qualification</option>
                  {qualificationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Interest Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Field</label>
              <div className="relative">
                <select
                  value={filterData.interestField}
                  onChange={(e) => handleInputChange('interestField', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select interest field</option>
                  {interestFieldOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Assigned To */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
              <div className="relative">
                <select
                  value={filterData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select assignee</option>
                  {assignedToOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          {additionalFilters.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Additional Filters</label>
              {additionalFilters.map((filter, index) => (
                <div key={index} className="flex items-center space-x-3 mb-3">
                  <div className="flex-1">
                    <select
                      value={filter.field}
                      onChange={(e) => updateAdditionalFilter(index, 'field', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="status">Status</option>
                      <option value="source">Source</option>
                      <option value="qualification">Qualification</option>
                      <option value="interestField">Interest Field</option>
                      <option value="assignedTo">Assigned To</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={filter.value}
                      onChange={(e) => updateAdditionalFilter(index, 'value', e.target.value)}
                      placeholder="Enter value"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removeFilter(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Filter Button */}
          <div className="mb-6">
            <button
              onClick={addFilter}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Filter
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
