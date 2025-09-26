import { ConditionTemplate } from '../types';

export const conditionTemplates: ConditionTemplate[] = [
  {
    searchTerm: 'digestive weakness',
    namasteCode: 'AG-001',
    namasteDescription: 'Agnimandya (Digestive Fire Weakness)',
    icd11TmCode: 'TM2-AG001',
    icd11TmDescription: 'Agni Mandya - Digestive dysfunction in Ayurveda',
    icd11BioCode: 'K30',
    icd11BioDescription: 'Functional dyspepsia'
  },
  {
    searchTerm: 'vata imbalance',
    namasteCode: 'VT-002',
    namasteDescription: 'Vata Dosha Vikruti (Vata Imbalance)',
    icd11TmCode: 'TM2-VT002',
    icd11TmDescription: 'Vata Dosha imbalance causing nervous system disorders',
    icd11BioCode: 'G93.9',
    icd11BioDescription: 'Disorder of brain, unspecified'
  },
  {
    searchTerm: 'kapha excess',
    namasteCode: 'KP-003',
    namasteDescription: 'Kapha Dosha Vriddhi (Excess Kapha)',
    icd11TmCode: 'TM2-KP003',
    icd11TmDescription: 'Kapha Dosha excess causing respiratory congestion',
    icd11BioCode: 'J44.9',
    icd11BioDescription: 'Chronic obstructive pulmonary disease, unspecified'
  },
  {
    searchTerm: 'pitta aggravation',
    namasteCode: 'PT-004',
    namasteDescription: 'Pitta Dosha Prakopa (Pitta Aggravation)',
    icd11TmCode: 'TM2-PT004',
    icd11TmDescription: 'Pitta Dosha aggravation causing inflammatory conditions',
    icd11BioCode: 'K27.9',
    icd11BioDescription: 'Peptic ulcer, site unspecified'
  },
  {
    searchTerm: 'ojas depletion',
    namasteCode: 'OJ-005',
    namasteDescription: 'Ojas Kshaya (Vital Essence Depletion)',
    icd11TmCode: 'TM2-OJ005',
    icd11TmDescription: 'Ojas depletion causing immune weakness',
    icd11BioCode: 'D89.9',
    icd11BioDescription: 'Immune deficiency, unspecified'
  },
  {
    searchTerm: 'ama accumulation',
    namasteCode: 'AM-006',
    namasteDescription: 'Ama Dosha (Toxic Accumulation)',
    icd11TmCode: 'TM2-AM006',
    icd11TmDescription: 'Ama (toxin) accumulation in tissues',
    icd11BioCode: 'E88.9',
    icd11BioDescription: 'Metabolic disorder, unspecified'
  },
  {
    searchTerm: 'joint stiffness',
    namasteCode: 'SD-007',
    namasteDescription: 'Sandhivata (Joint Disorders)',
    icd11TmCode: 'TM2-SD007',
    icd11TmDescription: 'Sandhi Vata causing joint pain and stiffness',
    icd11BioCode: 'M19.90',
    icd11BioDescription: 'Unspecified osteoarthritis, unspecified site'
  },
  {
    searchTerm: 'chronic fatigue',
    namasteCode: 'KL-008',
    namasteDescription: 'Klama (Chronic Fatigue)',
    icd11TmCode: 'TM2-KL008',
    icd11TmDescription: 'Klama - persistent fatigue in Ayurveda',
    icd11BioCode: 'G93.3',
    icd11BioDescription: 'Postviral fatigue syndrome'
  },
  {
    searchTerm: 'skin inflammation',
    namasteCode: 'KU-009',
    namasteDescription: 'Kushtha Roga (Skin Disorders)',
    icd11TmCode: 'TM2-KU009',
    icd11TmDescription: 'Kushtha - chronic inflammatory skin conditions',
    icd11BioCode: 'L30.9',
    icd11BioDescription: 'Dermatitis, unspecified'
  },
  {
    searchTerm: 'mental agitation',
    namasteCode: 'CH-010',
    namasteDescription: 'Chittodvega (Mental Agitation)',
    icd11TmCode: 'TM2-CH010',
    icd11TmDescription: 'Chitta Udvega - mental restlessness in Ayurveda',
    icd11BioCode: 'F41.9',
    icd11BioDescription: 'Anxiety disorder, unspecified'
  },
  {
    searchTerm: 'respiratory congestion',
    namasteCode: 'KA-011',
    namasteDescription: 'Kasa Roga (Respiratory Disorders)',
    icd11TmCode: 'TM2-KA011',
    icd11TmDescription: 'Kasa - chronic respiratory conditions',
    icd11BioCode: 'J44.1',
    icd11BioDescription: 'Chronic obstructive pulmonary disease with acute exacerbation'
  },
  {
    searchTerm: 'digestive heat',
    namasteCode: 'AG-012',
    namasteDescription: 'Agni Tikshna (Excessive Digestive Fire)',
    icd11TmCode: 'TM2-AG012',
    icd11TmDescription: 'Tikshna Agni - hyperacidity in Ayurveda',
    icd11BioCode: 'K21.9',
    icd11BioDescription: 'Gastro-oesophageal reflux disease without oesophagitis'
  },
  {
    searchTerm: 'blood impurity',
    namasteCode: 'RK-013',
    namasteDescription: 'Rakta Dushti (Blood Impurity)',
    icd11TmCode: 'TM2-RK013',
    icd11TmDescription: 'Rakta Dushti - blood disorders in Ayurveda',
    icd11BioCode: 'D75.9',
    icd11BioDescription: 'Disease of blood and blood-forming organs, unspecified'
  },
  {
    searchTerm: 'sleep disorders',
    namasteCode: 'AN-014',
    namasteDescription: 'Anidra (Sleeplessness)',
    icd11TmCode: 'TM2-AN014',
    icd11TmDescription: 'Anidra - chronic insomnia in Ayurveda',
    icd11BioCode: 'G47.00',
    icd11BioDescription: 'Insomnia, unspecified'
  },
  {
    searchTerm: 'memory weakness',
    namasteCode: 'SM-015',
    namasteDescription: 'Smriti Bhramsha (Memory Loss)',
    icd11TmCode: 'TM2-SM015',
    icd11TmDescription: 'Smriti Bhramsha - cognitive decline in Ayurveda',
    icd11BioCode: 'F06.8',
    icd11BioDescription: 'Other specified mental disorders due to known physiological condition'
  },
  {
    searchTerm: 'urinary disorders',
    namasteCode: 'MU-016',
    namasteDescription: 'Mutra Roga (Urinary Disorders)',
    icd11TmCode: 'TM2-MU016',
    icd11TmDescription: 'Mutra Roga - urogenital disorders in Ayurveda',
    icd11BioCode: 'N39.9',
    icd11BioDescription: 'Disorder of urinary system, unspecified'
  },
  {
    searchTerm: 'headache chronic',
    namasteCode: 'SH-017',
    namasteDescription: 'Shirashoola (Chronic Headache)',
    icd11TmCode: 'TM2-SH017',
    icd11TmDescription: 'Shirashoola - chronic headache disorders',
    icd11BioCode: 'G44.209',
    icd11BioDescription: 'Unspecified tension-type headache, not intractable'
  },
  {
    searchTerm: 'heart palpitations',
    namasteCode: 'HR-018',
    namasteDescription: 'Hridaya Kampa (Heart Palpitations)',
    icd11TmCode: 'TM2-HR018',
    icd11TmDescription: 'Hridaya Kampa - cardiac rhythm disorders in Ayurveda',
    icd11BioCode: 'R00.2',
    icd11BioDescription: 'Palpitations'
  },
  {
    searchTerm: 'abdominal bloating',
    namasteCode: 'UD-019',
    namasteDescription: 'Udara Shoola (Abdominal Pain)',
    icd11TmCode: 'TM2-UD019',
    icd11TmDescription: 'Udara Shoola - digestive system pain',
    icd11BioCode: 'R10.4',
    icd11BioDescription: 'Other and unspecified abdominal pain'
  },
  {
    searchTerm: 'menstrual irregularities',
    namasteCode: 'AR-020',
    namasteDescription: 'Artava Kshaya (Menstrual Disorders)',
    icd11TmCode: 'TM2-AR020',
    icd11TmDescription: 'Artava disorders - menstrual cycle irregularities',
    icd11BioCode: 'N92.6',
    icd11BioDescription: 'Irregular menstruation, unspecified'
  }
];