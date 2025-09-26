import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import ConditionSearch from '../components/Patient/ConditionSearch';
import PatientConditions from '../components/Patient/PatientConditions';
import { ArrowLeft, User, Phone, Calendar, Shield, CheckCircle } from 'lucide-react';
import { ConditionTemplate } from '../types';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPatientById, addConditionToPatient } = usePatients();
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedCondition, setLastAddedCondition] = useState<string>('');

  const patient = id ? getPatientById(id) : undefined;

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900">Patient not found</h2>
        <p className="text-gray-600 mt-2">The requested patient could not be located.</p>
        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const handleAddCondition = (condition: ConditionTemplate) => {
    if (patient) {
      addConditionToPatient(patient.id, {
        searchTerm: condition.searchTerm,
        namasteCode: condition.namasteCode,
        namasteDescription: condition.namasteDescription,
        icd11TmCode: condition.icd11TmCode,
        icd11TmDescription: condition.icd11TmDescription,
        icd11BioCode: condition.icd11BioCode,
        icd11BioDescription: condition.icd11BioDescription
      });
      
      setLastAddedCondition(condition.namasteDescription);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link to="/dashboard" className="hover:text-gray-900">Dashboard</Link>
        <span>→</span>
        <span className="text-gray-900">{patient.name}</span>
      </nav>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-green-800">Condition added successfully!</p>
              <p className="text-xs text-green-600 mt-1">
                {lastAddedCondition} has been saved in FHIR Condition format
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Patient Profile */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    <span>ABHA: {patient.abhaId}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{patient.gender}, Age {patient.age}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{patient.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Diagnosis Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Add Medical Condition</h2>
          <p className="text-sm text-gray-600 mt-1">
            Search for medical conditions and map them to traditional medicine terminologies
          </p>
        </div>
        <div className="p-6">
          <ConditionSearch onAddCondition={handleAddCondition} />
        </div>
      </div>

      {/* Previous Conditions */}
      <div>
        <PatientConditions conditions={patient.conditions} />
      </div>
    </div>
  );
};

export default PatientDetailPage;