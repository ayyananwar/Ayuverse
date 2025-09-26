export interface Patient {
  id: string;
  name: string;
  abhaId: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  lastVisit: string;
  conditions: MedicalCondition[];
}

export interface MedicalCondition {
  id: string;
  patientId: string;
  searchTerm: string;
  namasteCode: string;
  namasteDescription: string;
  icd11TmCode: string;
  icd11TmDescription: string;
  icd11BioCode: string;
  icd11BioDescription: string;
  dateAdded: string;
  addedBy: string;
}

export interface ConditionTemplate {
  searchTerm: string;
  namasteCode: string;
  namasteDescription: string;
  icd11TmCode: string;
  icd11TmDescription: string;
  icd11BioCode: string;
  icd11BioDescription: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  doctorName: string;
  action: string;
  patientName: string;
  details: string;
}

export interface User {
  id: string;
  name: string;
  abhaToken: string;
}

export interface AnalyticsData {
  topConditions: { name: string; count: number }[];
  codingUsage: { name: string; value: number }[];
  monthlyVisits: { month: string; visits: number }[];
  totalPatients: number;
  activeConditions: number;
  systemUsage: number;
}