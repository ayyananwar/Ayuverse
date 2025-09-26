import React, { useState, useMemo } from 'react';
import { Dialog } from '@headlessui/react';
import { usePatients } from '../context/PatientContext';
import { useAudit } from '../context/AuditContext';
import PatientSearch from '../components/Patient/PatientSearch';
import PatientTable from '../components/Patient/PatientTable';
import { Users, Plus, Activity, FileText } from 'lucide-react';
import { conditionTemplates } from '../data/conditions';
import { ConditionTemplate } from '../types';

const DashboardPage: React.FC = () => {
  const { patients: rawPatients, addPatient } = usePatients();
  const { auditLogs: rawAuditLogs } = useAudit();
  const patients = Array.isArray(rawPatients) ? rawPatients : [];
  const auditLogs = Array.isArray(rawAuditLogs) ? rawAuditLogs : [];
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '', abhaId: '', age: '', gender: 'Male', contact: '', lastVisit: ''
  });
  // ...existing code...
  // State for new condition
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);
  const [newCondition, setNewCondition] = useState<ConditionTemplate>({
    searchTerm: '',
    namasteCode: '',
    namasteDescription: '',
    icd11TmCode: '',
    icd11TmDescription: '',
    icd11BioCode: '',
    icd11BioDescription: ''
  });
  const [conditionSuccess, setConditionSuccess] = useState(false);
  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    // Add to conditionTemplates (in-memory, not persistent)
    conditionTemplates.push({ ...newCondition });
    setConditionSuccess(true);
    setTimeout(() => setConditionSuccess(false), 2500);
    setIsConditionModalOpen(false);
    setNewCondition({
      searchTerm: '',
      namasteCode: '',
      namasteDescription: '',
      icd11TmCode: '',
      icd11TmDescription: '',
      icd11BioCode: '',
      icd11BioDescription: ''
    });
  };

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients;
    const query = searchQuery.toLowerCase();
    return patients.filter(patient =>
      (patient.name || '').toLowerCase().includes(query) ||
      (patient.abhaId || '').toLowerCase().includes(query) ||
      (patient.contact || '').includes(query)
    );
  }, [patients, searchQuery]);

  const stats = useMemo(() => {
    const totalConditions = patients.reduce((sum, patient) => sum + (Array.isArray(patient.conditions) ? patient.conditions.length : 0), 0);
    const recentActivity = auditLogs.length;
    return {
      totalPatients: patients.length,
      totalConditions,
      recentActivity
    };
  }, [patients, auditLogs]);

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient({
      name: newPatient.name,
      abhaId: newPatient.abhaId,
      age: Number(newPatient.age),
  gender: newPatient.gender as 'Male' | 'Female' | 'Other',
      contact: newPatient.contact,
      lastVisit: newPatient.lastVisit
    });
    setIsModalOpen(false);
    setNewPatient({ name: '', abhaId: '', age: '', gender: 'Male', contact: '', lastVisit: '' });
  };

  return (
    <div className="space-y-6">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage patients and medical conditions with traditional medicine integration
          </p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Patient
        </button>
      </div>

      {/* Create New Condition Section */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Create New Condition</h2>
            <p className="text-sm text-gray-600 mt-1">Add a new medical condition to the system for future mapping and diagnosis.</p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            onClick={() => setIsConditionModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Condition
          </button>
        </div>
        {conditionSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
            <p className="text-green-800 text-sm font-medium">Condition added successfully!</p>
          </div>
        )}
        <Dialog open={isConditionModalOpen} onClose={() => setIsConditionModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-30" />
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto z-50 p-6 relative">
              <Dialog.Title className="text-lg font-bold mb-4">Add New Condition</Dialog.Title>
              <form className="space-y-4" onSubmit={handleAddCondition}>
                <input required type="text" placeholder="Search Term" className="w-full border rounded px-3 py-2" value={newCondition.searchTerm} onChange={e => setNewCondition({ ...newCondition, searchTerm: e.target.value })} />
                <input required type="text" placeholder="NAMASTE Code" className="w-full border rounded px-3 py-2" value={newCondition.namasteCode} onChange={e => setNewCondition({ ...newCondition, namasteCode: e.target.value })} />
                <input required type="text" placeholder="NAMASTE Description" className="w-full border rounded px-3 py-2" value={newCondition.namasteDescription} onChange={e => setNewCondition({ ...newCondition, namasteDescription: e.target.value })} />
                <input required type="text" placeholder="ICD-11 TM2 Code" className="w-full border rounded px-3 py-2" value={newCondition.icd11TmCode} onChange={e => setNewCondition({ ...newCondition, icd11TmCode: e.target.value })} />
                <input required type="text" placeholder="ICD-11 TM2 Description" className="w-full border rounded px-3 py-2" value={newCondition.icd11TmDescription} onChange={e => setNewCondition({ ...newCondition, icd11TmDescription: e.target.value })} />
                <input required type="text" placeholder="ICD-11 Biomedicine Code" className="w-full border rounded px-3 py-2" value={newCondition.icd11BioCode} onChange={e => setNewCondition({ ...newCondition, icd11BioCode: e.target.value })} />
                <input required type="text" placeholder="ICD-11 Biomedicine Description" className="w-full border rounded px-3 py-2" value={newCondition.icd11BioDescription} onChange={e => setNewCondition({ ...newCondition, icd11BioDescription: e.target.value })} />
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setIsConditionModalOpen(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-teal-600 text-white">Add Condition</button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalPatients}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Conditions</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalConditions}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Audit Entries</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.recentActivity}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

 

      {/* Patient Search and List */}
  <div className="bg-white shadow rounded-lg mt-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Patient Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Search and manage your patients with ABHA integration
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <PatientSearch onSearch={setSearchQuery} />
          </div>
          <div className="overflow-x-auto">
            <PatientTable patients={filteredPatients} />
          </div>
          {filteredPatients.length > 0 && (
            <div className="mt-4 flex justify-center">
              <p className="text-sm text-gray-600">
                Showing {filteredPatients.length} of {patients.length} patients
              </p>
            </div>
          )}
        </div>
      {/* Add Patient Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto z-50 p-6 relative">
            <Dialog.Title className="text-lg font-bold mb-4">Add New Patient</Dialog.Title>
            <form className="space-y-4" onSubmit={handleAddPatient}>
              <input required type="text" placeholder="Name" className="w-full border rounded px-3 py-2" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} />
              <input required type="text" placeholder="ABHA ID" className="w-full border rounded px-3 py-2" value={newPatient.abhaId} onChange={e => setNewPatient({ ...newPatient, abhaId: e.target.value })} />
              <input required type="number" placeholder="Age" className="w-full border rounded px-3 py-2" value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} />
              <select className="w-full border rounded px-3 py-2" value={newPatient.gender} onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input required type="text" placeholder="Contact" className="w-full border rounded px-3 py-2" value={newPatient.contact} onChange={e => setNewPatient({ ...newPatient, contact: e.target.value })} />
              <input required type="date" placeholder="Last Visit" className="w-full border rounded px-3 py-2" value={newPatient.lastVisit} onChange={e => setNewPatient({ ...newPatient, lastVisit: e.target.value })} />
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
      </div>
    </div>
  );
};

export default DashboardPage;