import { AnalyticsData } from '../types';

export const analyticsData: AnalyticsData = {
  topConditions: [
    { name: 'Agnimandya (Digestive Issues)', count: 45 },
    { name: 'Vata Dosha Imbalance', count: 38 },
    { name: 'Kapha Excess', count: 32 },
    { name: 'Pitta Aggravation', count: 28 },
    { name: 'Joint Disorders (Sandhivata)', count: 25 },
    { name: 'Chronic Fatigue (Klama)', count: 22 },
    { name: 'Sleep Disorders (Anidra)', count: 19 },
    { name: 'Skin Issues (Kushtha)', count: 16 },
    { name: 'Mental Agitation', count: 14 },
    { name: 'Respiratory Issues (Kasa)', count: 12 }
  ],
  codingUsage: [
    { name: 'Traditional Medicine (NAMASTE)', value: 65 },
    { name: 'Biomedicine (ICD-11)', value: 35 }
  ],
  monthlyVisits: [
    { month: 'Aug 2023', visits: 145 },
    { month: 'Sep 2023', visits: 162 },
    { month: 'Oct 2023', visits: 178 },
    { month: 'Nov 2023', visits: 195 },
    { month: 'Dec 2023', visits: 210 },
    { month: 'Jan 2024', visits: 232 }
  ],
  totalPatients: 847,
  activeConditions: 1204,
  systemUsage: 94
};