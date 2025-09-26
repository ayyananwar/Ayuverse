import React, { useState, useMemo } from 'react';
import { Calendar, Download, Filter, Search } from 'lucide-react';
import { useAudit } from '../context/AuditContext';

const AuditLogPage: React.FC = () => {
  const { auditLogs, addAuditLog } = useAudit();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [dateRange, setDateRange] = useState('7');

  const filteredLogs = useMemo(() => {
    let filtered = auditLogs;
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log =>
        (log.user || '').toLowerCase().includes(term) ||
        log.action.toLowerCase().includes(term) ||
        (log.details || '').toLowerCase().includes(term)
      );
    }
    // Filter by action
    if (actionFilter !== 'All') {
      filtered = filtered.filter(log => log.action === actionFilter);
    }
    // Filter by date range
    const daysBack = parseInt(dateRange);
    if (daysBack > 0) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysBack);
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= cutoffDate;
      });
    }
    return filtered;
  }, [auditLogs, searchTerm, actionFilter, dateRange]);

  const uniqueActions = useMemo(() => {
    const actions = Array.from(new Set(auditLogs.map(log => log.action)));
    return ['All', ...actions.sort()];
  }, [auditLogs]);

  const handleExport = () => {
    // Simulate export functionality
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Details'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user || '',
        log.action,
        log.details || ''
      ])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Add log form state
  const [newAction, setNewAction] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAction) return;
    addAuditLog({ action: newAction, user: newUser, details: newDetails });
    setNewAction('');
    setNewUser('');
    setNewDetails('');
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track all system activities for compliance and security monitoring
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Log
        </button>
      </div>

      {/* Add Audit Log Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <form className="p-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={handleAddLog}>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">User</label>
            <input type="text" value={newUser} onChange={e => setNewUser(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="User name" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Action</label>
            <input type="text" value={newAction} onChange={e => setNewAction(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Action type" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <input type="text" value={newDetails} onChange={e => setNewDetails(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Details" />
          </div>
          <button type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium">
            Add Log
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search logs..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="action" className="block text-sm font-medium text-gray-700">
                Action Type
              </label>
              <select
                id="action"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {uniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="0">All time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

  {/* Audit Log Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Activity Log ({filteredLogs.length} entries)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No audit log entries found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, idx) => (
                  <tr key={log.timestamp + idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div>{new Date(log.timestamp).toLocaleDateString('en-IN')}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString('en-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={log.details}>
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogPage;