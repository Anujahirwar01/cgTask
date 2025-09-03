import './App.css'
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/navbar';
import Header from './components/header';
import LeadsTable from './components/leadstable';
import FilterModal from './components/filter';
import { Filter } from 'lucide-react';

function App() {
  const [allLeads, setAllLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchText, setSearchText] = useState('');

  // Function to fetch leads from backend
  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:3000/leads');
      const result = await response.json();
      
      if (result.success) {
        // Transform backend data to frontend format
        const formattedLeads = result.data.map(lead => ({
          name: lead.name,
          contact: lead.phone,
          status: lead.status,
          qualification: lead.qualification,
          interest: lead.interestField,
          source: lead.source,
          assignedTo: lead.assignedTo,
          updatedDate: new Date(lead.updatedAt).toLocaleDateString(),
          updatedTime: new Date(lead.updatedAt).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        }));
        
        setAllLeads(formattedLeads);
        setFilteredLeads(formattedLeads);
      } else {
        console.error('Failed to fetch leads:', result.message);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  // Function to add a new lead to the state
  const addNewLead = (newLead) => {
    setAllLeads(prevLeads => [newLead, ...prevLeads]);
    setFilteredLeads(prevLeads => [newLead, ...prevLeads]);
    fetchLeads();
  };

  // Function to handle filter modal
  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    applyFilters(filters, searchText);
  };

  // Function to apply filters to the leads
  const applyFilters = useCallback((filters, search) => {
    let filtered = [...allLeads];

  
    if (search && search.trim() !== '') {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.contact.toLowerCase().includes(search.toLowerCase()) ||
        lead.assignedTo.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters && Object.keys(filters).length > 0) {
      const { matchType = 'ALL' } = filters;

      const conditions = [];

      if (filters.status && filters.status !== '') {
        conditions.push(lead => lead.status === filters.status);
      }
      if (filters.source && filters.source !== '') {
        conditions.push(lead => lead.source === filters.source);
      }
      if (filters.qualification && filters.qualification !== '') {
        conditions.push(lead => lead.qualification === filters.qualification);
      }
      if (filters.interestField && filters.interestField !== '') {
        conditions.push(lead => lead.interest === filters.interestField);
      }
      if (filters.assignedTo && filters.assignedTo !== '') {
        conditions.push(lead => lead.assignedTo === filters.assignedTo);
      }

      if (filters.additionalFilters && filters.additionalFilters.length > 0) {
        filters.additionalFilters.forEach(filter => {
          if (filter.field && filter.value) {
            const fieldMap = {
              'status': 'status',
              'source': 'source', 
              'qualification': 'qualification',
              'interestField': 'interest',
              'assignedTo': 'assignedTo'
            };
            const leadField = fieldMap[filter.field];
            if (leadField) {
              conditions.push(lead => 
                lead[leadField].toLowerCase().includes(filter.value.toLowerCase())
              );
            }
          }
        });
      }

      if (conditions.length > 0) {
        if (matchType === 'ALL') {
          filtered = filtered.filter(lead => 
            conditions.every(condition => condition(lead))
          );
        } else {
          filtered = filtered.filter(lead => 
            conditions.some(condition => condition(lead))
          );
        }
      }
    }

    setFilteredLeads(filtered);
  }, [allLeads]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    applyFilters(activeFilters, searchValue);
  };

  const hasActiveFilters = (
    Object.values(activeFilters).some(value => value && value !== '') ||
    searchText.trim() !== ''
  );

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    applyFilters(activeFilters, searchText);
  }, [allLeads, activeFilters, applyFilters, searchText]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Header onLeadAdded={addNewLead} />
        <main className="flex-1 overflow-auto">
          <div className="flex items-center mt-6 ml-6 space-x-4">
            <input
              value={searchText}
              onChange={handleSearchChange}
              className="border w-250 h-9 border-gray-300 rounded-lg p-2"
              placeholder="Search by name, email or phone..."
            />
            <button 
              onClick={handleFilterClick}
              className={`h-9 w-26 px-8 py-2 border border-gray-300 rounded-lg font-medium text-sm flex items-center font-black transition-colors duration-150 hover:bg-gray-200 ${
                hasActiveFilters 
                  ? 'bg-blue-100 text-blue-700 border-blue-300' 
                  : 'bg-gray-100 text-black'
              }`}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
          </div>
          <LeadsTable leads={filteredLeads} />
        </main>
      </div>
      
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  )
}

export default App