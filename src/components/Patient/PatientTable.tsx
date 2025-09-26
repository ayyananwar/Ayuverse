import React from 'react';
import { Link } from 'react-router-dom';
import { Patient } from '../../types';
import { Calendar, Phone, User } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {patients.length === 0 ? (
          <li className="px-6 py-8 text-center text-gray-500">
            No patients found matching your search.
          </li>
        ) : (
          patients.map((patient) => (
            <li key={patient.id}>
              <Link
                to={`/patients/${patient.id}`}
                className="block hover:bg-gray-50 px-6 py-4 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {patient.gender}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500 space-x-4">
                        <span>Age: {patient.age}</span>
                        <span>ABHA: {patient.abhaId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>{patient.contact}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PatientTable;