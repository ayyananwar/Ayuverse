import { createContext, useContext, useState, ReactNode } from 'react';

export interface AuditLog {
  timestamp: string;
  action: string;
  user?: string;
  details?: string;
}

interface AuditContextType {
  auditLogs: AuditLog[];
  addAuditLog: (log: Omit<AuditLog, 'timestamp'>) => void;
  clearAuditLogs: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
};

export const AuditProvider = ({ children }: { children: ReactNode }) => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const addAuditLog = (log: Omit<AuditLog, 'timestamp'>) => {
    setAuditLogs((prev) => [
      { ...log, timestamp: new Date().toISOString() },
      ...prev
    ]);
  };

  const clearAuditLogs = () => setAuditLogs([]);

  return (
    <AuditContext.Provider value={{ auditLogs, addAuditLog, clearAuditLogs }}>
      {children}
    </AuditContext.Provider>
  );
};
