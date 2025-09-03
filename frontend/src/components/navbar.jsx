import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Package, 
  Bell, 
  Settings,
  ChevronLeft
} from 'lucide-react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Leads');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Leads', icon: Users },
    { name: 'Follow-Ups', icon: Calendar },
    { name: 'Sales Activity', icon: TrendingUp },
    { name: 'Products', icon: Package },
    { name: 'Notifications', icon: Bell },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen  bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">LeadCRM</h1>
        <button className="p-1 hover:bg-gray-200 rounded">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <nav className="flex-1 pt-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            return (
              <li key={item.name}>
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;