import React, { useState, useEffect } from 'react';
import { Search, Plus, Check } from 'lucide-react';
import { ConditionTemplate } from '../../types';
import { conditionTemplates } from '../../data/conditions';

interface ConditionSearchProps {
  onAddCondition: (condition: ConditionTemplate) => void;
}

const ConditionSearch: React.FC<ConditionSearchProps> = ({ onAddCondition }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ConditionTemplate[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addedConditions, setAddedConditions] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchTerm = query.toLowerCase();
    const filteredResults = conditionTemplates.filter(condition =>
      condition.searchTerm.toLowerCase().includes(searchTerm) ||
      condition.namasteDescription.toLowerCase().includes(searchTerm) ||
      condition.icd11BioDescription.toLowerCase().includes(searchTerm)
    );
    
    setTimeout(() => {
      setResults(filteredResults.slice(0, 8));
      setIsSearching(false);
    }, 300);
  }, [query]);

  const handleAddCondition = (condition: ConditionTemplate) => {
    onAddCondition(condition);
    setAddedConditions(prev => new Set(prev).add(condition.namasteCode));
    // Clear search after adding
    setTimeout(() => {
      setQuery('');
      setResults([]);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Search medical conditions (e.g., digestive weakness, vata imbalance, joint pain...)"
        />
      </div>

      {isSearching && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Searching conditions...</span>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Search Results</h3>
            <p className="text-xs text-gray-600 mt-1">Click on any condition to add it to the patient's record</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NAMASTE Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ICD-11 TM2 Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ICD-11 Biomedicine
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((condition, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-teal-600">{condition.namasteCode}</div>
                        <div className="text-sm text-gray-900">{condition.namasteDescription}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-blue-600">{condition.icd11TmCode}</div>
                        <div className="text-sm text-gray-900">{condition.icd11TmDescription}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-purple-600">{condition.icd11BioCode}</div>
                        <div className="text-sm text-gray-900">{condition.icd11BioDescription}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {addedConditions.has(condition.namasteCode) ? (
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check className="w-3 h-3 mr-1" />
                          Added
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddCondition(condition)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && !isSearching && (
        <div className="text-center py-8 bg-white border border-gray-200 rounded-lg">
          <Search className="mx-auto h-8 w-8 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No conditions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try searching with different terms like "digestive", "joint pain", or "sleep"
          </p>
        </div>
      )}
    </div>
  );
};

export default ConditionSearch;