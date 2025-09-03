import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

const LeadsTable = ({ leads = [] }) => {
  const tableHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Contact', key: 'contact' },
    { label: 'Status', key: 'status' },
    { label: 'Qualification', key: 'qualification' },
    { label: 'Interest', key: 'interest' },
    { label: 'Source', key: 'source' },
    { label: 'Assigned To', key: 'assignedTo' },
    { label: 'Updated At', key: 'updatedAt' },
    { label: '', key: 'actions' }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Follow-Up': 'bg-orange-100 text-orange-800',
      'Qualified': 'bg-green-100 text-green-800',
      'Converted': 'bg-purple-100 text-purple-800',
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="mt-6 mx-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-9 gap-4 px-6 py-3">
            {tableHeaders.map((header) => (
              <div key={header.key} className={`flex items-center text-sm font-medium text-gray-600 ${header.key === 'actions' ? 'justify-center' : ''}`}>
                {header.label}
                {header.key !== 'actions' && (
                  <ArrowUpDown className="ml-2 h-3 w-3 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-500 text-sm">
                <p className="mb-2">No leads found</p>
                <p className="text-xs">Add your first lead to get started</p>
              </div>
            </div>
          ) : (
            leads.map((lead, index) => (
              <div key={index} className="grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    {lead.name}
                  </button>
                </div>
                <div className="text-sm text-gray-900">
                  {lead.contact}
                </div>
                <div>
                  {getStatusBadge(lead.status)}
                </div>
                <div className="text-sm text-gray-900">
                  {lead.qualification}
                </div>
                <div className="text-sm text-gray-900">
                  {lead.interest}
                </div>
                <div className="text-sm text-gray-900">
                  {lead.source}
                </div>
                <div className="text-sm text-gray-900">
                  {lead.assignedTo}
                </div>
                <div className="text-sm text-gray-500">
                  <div>{lead.updatedDate}</div>
                  <div className="text-xs">{lead.updatedTime}</div>
                </div>
                <div className="flex justify-center">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsTable;