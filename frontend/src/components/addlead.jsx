import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const AddLead = ({ isOpen, onClose, onLeadCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    email: '',
    altEmail: '',
    status: 'New',
    qualification: 'High School',
    interestField: 'Web Development',
    source: 'Website',
    assignedTo: 'John Doe',
    jobInterest: 'Select job interest',
    state: '',
    city: '',
    passoutYear: '',
    heardFrom: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in required fields: Name, Email, and Phone');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Sending form data:', formData);
      
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      console.log('Response status:', response.status);
      console.log('Response data:', result);

      if (result.success) {
        const newLead = {
          name: result.data.name,
          contact: result.data.phone,
          status: result.data.status,
          qualification: result.data.qualification,
          interest: result.data.interestField,
          source: result.data.source,
          assignedTo: result.data.assignedTo,
          updatedDate: new Date().toLocaleDateString(),
          updatedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (onLeadCreated) {
          onLeadCreated(newLead);
        }

        alert('Lead created successfully!');
        handleCancel();
      } else {
        alert(result.message || 'Error creating lead');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      phone: '',
      altPhone: '',
      email: '',
      altEmail: '',
      status: 'New',
      qualification: 'High School',
      interestField: 'Web Development',
      source: 'Website',
      assignedTo: 'John Doe',
      jobInterest: 'Select job interest',
      state: '',
      city: '',
      passoutYear: '',
      heardFrom: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(3px)'
      }}
    >
      <div className="bg-white rounded-lg w-90 max-w-2xl mx-4 max-h-[90vh] shadow-2xl border border-gray-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-2 0">
          <h2 className="text-sm font-semibold text-gray-900">Add Lead</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 ">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 ">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Alt. Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 ">Alt. Phone</label>
              <input
                type="text"
                value={formData.altPhone}
                onChange={(e) => handleInputChange('altPhone', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 ">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Alt. Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Alt. Email</label>
              <input
                type="email"
                value={formData.altEmail}
                onChange={(e) => handleInputChange('altEmail', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="New">New</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Converted">Converted</option>
                  <option value="Contacted">Contacted</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <div className="relative">
                <select
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="High School">High School</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Interest Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 ">Interest Field</label>
              <div className="relative">
                <select
                  value={formData.interestField}
                  onChange={(e) => handleInputChange('interestField', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="UX/UI Design">UX/UI Design</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Source</label>
              <div className="relative">
                <select
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="Website">Website</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Email Campaign">Email Campaign</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Referral">Referral</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              <div className="relative">
                <select
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Emily Davis">Emily Davis</option>
                  <option value="Robert Johnson">Robert Johnson</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Job Interest */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Interest</label>
              <div className="relative">
                <select
                  value={formData.jobInterest}
                  onChange={(e) => handleInputChange('jobInterest', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="Select job interest">Select job interest</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Digital Marketer">Digital Marketer</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Passout Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Passout Year</label>
              <input
                type="text"
                value={formData.passoutYear}
                onChange={(e) => handleInputChange('passoutYear', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Heard From */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Heard From</label>
              <input
                type="text"
                value={formData.heardFrom}
                onChange={(e) => handleInputChange('heardFrom', e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 px-6 py-2 ">
          <button
            onClick={handleCancel}
            className="px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-1 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Lead'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLead;