import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, MedicalCondition } from '../types';
import { patients as initialPatients } from '../data/patients';
import { useAudit } from './AuditContext';

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'conditions'>) => void;
  addConditionToPatient: (patientId: string, condition: Omit<MedicalCondition, 'id' | 'patientId' | 'dateAdded' | 'addedBy'>) => void;
  searchPatients: (query: string) => Patient[];
  getPatientById: (id: string) => Patient | undefined;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const addPatient = (patient: Omit<Patient, 'id' | 'conditions'>) => {
    const newPatient: Patient = {
      ...patient,
      id: `pat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      conditions: []
    };
    setPatients(prev => [newPatient, ...prev]);
    addAuditLog({
      action: 'Created Patient',
      user: 'Dr. Ayyan Kumar',
      details: `Created patient ${newPatient.name} (ABHA: ${newPatient.abhaId})`
    });
  };
  const { addAuditLog } = useAudit();

  const addConditionToPatient = (
    patientId: string, 
    condition: Omit<MedicalCondition, 'id' | 'patientId' | 'dateAdded' | 'addedBy'>
  ) => {
    const newCondition: MedicalCondition = {
      ...condition,
      id: `cond-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      patientId,
      dateAdded: new Date().toISOString(),
      addedBy: 'Dr. Ayyan Kumar'
    };

    setPatients(prevPatients => {
      const updatedPatients = prevPatients.map(patient =>
        patient.id === patientId
          ? { ...patient, conditions: [...patient.conditions, newCondition] }
          : patient
      );
      // Add audit log entry using AuditContext
      const patient = updatedPatients.find(p => p.id === patientId);
      if (patient) {
        addAuditLog({
          action: 'Added Condition',
          user: 'Dr. Ayyan Kumar',
          details: `Added ${condition.namasteDescription} (${condition.icd11TmCode} → ${condition.icd11BioCode}) to ${patient.name}`
        });
      }
      return updatedPatients;
    });
  };

  const searchPatients = (query: string): Patient[] => {
    if (!query.trim()) return patients;
    
    const searchTerm = query.toLowerCase();
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm) ||
      patient.abhaId.toLowerCase().includes(searchTerm) ||
      patient.contact.includes(searchTerm)
    );
  };

  const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
  };

  const value: PatientContextType = {
    patients,
    addPatient,
    addConditionToPatient,
    searchPatients,
    getPatientById
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};