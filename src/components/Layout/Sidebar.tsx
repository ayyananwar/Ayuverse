import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, FileText, BarChart3, Home } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/patients', icon: Users, label: 'Patients' },
    { to: '/audit', icon: FileText, label: 'Audit Log' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' }
  ];

  return (
    <aside className="bg-gray-50 border-r border-gray-200 w-64 min-h-screen fixed md:static top-0 left-0 z-40 md:z-auto h-full md:h-auto transition-all duration-300 md:w-64 w-5/6 max-w-xs md:max-w-none flex flex-col">
      <nav className="mt-8 px-2 md:px-4 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-2 md:px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Mobile toggle button (optional, for hamburger menu) */}
      {/* You can add a button here for mobile to show/hide sidebar if needed */}
    </aside>
  );
};

export default Sidebar;