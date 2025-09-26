import React from 'react';
import { MedicalCondition } from '../../types';
import { Calendar, User, FileText } from 'lucide-react';

interface PatientConditionsProps {
  conditions: MedicalCondition[];
}

const PatientConditions: React.FC<PatientConditionsProps> = ({ conditions }) => {
  if (conditions.length === 0) {
    return (
      <div className="text-center py-8 bg-white border border-gray-200 rounded-lg">
        <FileText className="mx-auto h-8 w-8 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No previous conditions</h3>
        <p className="mt-1 text-sm text-gray-500">
          This patient has no recorded medical conditions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Previous Conditions</h3>
        <p className="text-xs text-gray-600 mt-1">Medical history with traditional and biomedicine coding</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {conditions.map((condition) => (
          <div key={condition.id} className="p-4 hover:bg-gray-50">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-teal-600">{condition.namasteCode}</h4>
                <p className="text-sm text-gray-900 mt-1">{condition.namasteDescription}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-600">{condition.icd11TmCode}</h4>
                <p className="text-sm text-gray-900 mt-1">{condition.icd11TmDescription}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-purple-600">{condition.icd11BioCode}</h4>
                <p className="text-sm text-gray-900 mt-1">{condition.icd11BioDescription}</p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{new Date(condition.dateAdded).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                <span>Added by {condition.addedBy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientConditions;