// ============ SEED DATA ============
export const initialMembers = [
  {
    id: 'M001', employeeId: '2024-001', name: 'Carmelita Tiglao', department: 'College of Nursing',
    status: 'Permanent', photo: null, email: 'c.tiglao@wesleyan.edu.ph', phone: '0917-555-0101',
    age: 48, gender: 'Female', dateHired: '2010-06-15', active: true,
    approvalStatus: 'Approved', approvedBy: 'Maria Santos', approvedAt: '2024-01-20',
    dependents: [
      { id: 'D001', name: 'Juan Tiglao', relationship: 'Spouse', age: 52, photo: null },
      { id: 'D002', name: 'Maria Tiglao', relationship: 'Child', age: 16, photo: null },
    ]
  },
  {
    id: 'M002', employeeId: '2024-002', name: 'Mark Steven Reyes', department: 'College of Engineering',
    status: 'Permanent', photo: null, email: 'm.reyes@wesleyan.edu.ph', phone: '0917-555-0102',
    age: 39, gender: 'Male', dateHired: '2015-08-01', active: true,
    approvalStatus: 'Approved', approvedBy: 'Maria Santos', approvedAt: '2024-02-15',
    dependents: [
      { id: 'D003', name: 'Angela Reyes', relationship: 'Spouse', age: 36, photo: null },
    ]
  },
  {
    id: 'M003', employeeId: '2024-003', name: 'Ana Luisa Bautista', department: 'College of Arts & Sciences',
    status: 'Permanent', photo: null, email: 'a.bautista@wesleyan.edu.ph', phone: '0917-555-0103',
    age: 34, gender: 'Female', dateHired: '2020-01-10', active: true,
    approvalStatus: 'Approved', approvedBy: 'Maria Santos', approvedAt: '2024-03-01',
    dependents: []
  },
  {
    id: 'M004', employeeId: '2024-004', name: 'Roberto Santos', department: 'College of Business',
    status: 'Permanent', photo: null, email: 'r.santos@wesleyan.edu.ph', phone: '0917-555-0104',
    age: 55, gender: 'Male', dateHired: '2005-06-15', active: true,
    approvalStatus: 'Approved', approvedBy: 'Maria Santos', approvedAt: '2024-01-10',
    dependents: [
      { id: 'D004', name: 'Helena Santos', relationship: 'Spouse', age: 52, photo: null },
      { id: 'D005', name: 'Paolo Santos', relationship: 'Child', age: 19, photo: null },
      { id: 'D006', name: 'Sofia Santos', relationship: 'Child', age: 14, photo: null },
    ]
  },
  {
    id: 'M005', employeeId: '2024-005', name: 'Jennifer Cruz', department: 'Registrar Office',
    status: 'Permanent', photo: null, email: 'j.cruz@wesleyan.edu.ph', phone: '0917-555-0105',
    age: 29, gender: 'Female', dateHired: '2023-03-15', active: true,
    approvalStatus: 'Approved', approvedBy: 'Maria Santos', approvedAt: '2024-04-02',
    dependents: []
  },
  {
    id: 'M006', employeeId: '2024-006', name: 'Eduardo Villanueva', department: 'Maintenance Services',
    status: 'Permanent', photo: null, email: 'e.villanueva@wesleyan.edu.ph', phone: '0917-555-0106',
    age: 47, gender: 'Male', dateHired: '2012-11-02', active: true,
    approvalStatus: 'Approved', approvedBy: 'Maria Santos', approvedAt: '2024-01-05',
    dependents: [
      { id: 'D007', name: 'Rosa Villanueva', relationship: 'Spouse', age: 44, photo: null },
    ]
  },
  // Sample pending registration for coordinator to approve
  {
    id: 'M007', employeeId: '2026-007', name: 'Gerardo Mendoza', department: 'College of Education',
    status: 'Permanent', photo: null, email: 'g.mendoza@wesleyan.edu.ph', phone: '0917-555-0107',
    age: 41, gender: 'Male', dateHired: '2024-07-01', active: true,
    approvalStatus: 'Pending', approvedBy: null, approvedAt: null,
    dependents: [
      { id: 'D008', name: 'Elena Mendoza', relationship: 'Spouse', age: 38, photo: null },
      { id: 'D009', name: 'Lucas Mendoza', relationship: 'Child', age: 8, photo: null },
    ]
  },
];

export const initialConsultations = [
  { id: 'C-000284', serialNo: '000284', memberId: 'M001', dependentId: null, date: '2026-03-10', patientType: 'Consultation', chiefComplaints: 'Headache, fatigue for 3 days', peFindings: 'BP: 130/85, Pallor noted', plan: 'CBC, urinalysis requested', diagnosis: 'Anemia, rule out hypertension', status: 'Approved', physician: 'Dr. A. Mendoza', createdAt: '2026-03-10T09:30:00', documentUploaded: true, documentName: 'consult_000284.pdf' },
  { id: 'C-000285', serialNo: '000285', memberId: 'M002', dependentId: 'D003', date: '2026-03-12', patientType: 'Outpatient', chiefComplaints: 'Persistent cough', peFindings: 'Lungs with crackles', plan: 'Chest X-ray, complete blood count', diagnosis: 'Bronchitis', status: 'Approved', physician: 'Dr. R. Garcia', createdAt: '2026-03-12T14:20:00', documentUploaded: true, documentName: 'consult_000285.pdf' },
  { id: 'C-000286', serialNo: '000286', memberId: 'M004', dependentId: 'D005', date: '2026-03-18', patientType: 'Emergency', chiefComplaints: 'Fever and abdominal pain', peFindings: 'Tenderness in RLQ', plan: 'CBC, urinalysis, ultrasound', diagnosis: 'R/O Appendicitis', status: 'Completed', physician: 'Dr. L. Rivera', createdAt: '2026-03-18T22:15:00', documentUploaded: true, documentName: 'consult_000286.pdf' },
  { id: 'C-000287', serialNo: '000287', memberId: 'M001', dependentId: null, date: '2026-04-02', patientType: 'Consultation', chiefComplaints: 'Follow-up on anemia', peFindings: 'Improved pallor', plan: 'Repeat CBC after 2 weeks', diagnosis: 'Iron-deficiency anemia, improving', status: 'Completed', physician: 'Dr. A. Mendoza', createdAt: '2026-04-02T10:45:00', documentUploaded: true, documentName: 'consult_000287.pdf' },
  { id: 'C-000288', serialNo: '000288', memberId: 'M003', dependentId: null, date: '2026-04-10', patientType: 'Consultation', chiefComplaints: 'Annual physical exam', peFindings: 'Unremarkable', plan: 'Routine labs', diagnosis: 'Healthy', status: 'Pending', physician: '', createdAt: '2026-04-10T08:00:00', documentUploaded: false, documentName: null },
  { id: 'C-000289', serialNo: '000289', memberId: 'M006', dependentId: null, date: '2026-04-15', patientType: 'Outpatient', chiefComplaints: 'Back pain after work', peFindings: 'Muscle spasm, lumbar area', plan: 'Pain management, X-ray spine', diagnosis: 'Mechanical back pain', status: 'Approved', physician: 'Dr. A. Mendoza', createdAt: '2026-04-15T15:30:00', documentUploaded: false, documentName: null },
  { id: 'C-000290', serialNo: '000290', memberId: 'M002', dependentId: null, date: '2026-04-18', patientType: 'Consultation', chiefComplaints: 'Routine check-up', peFindings: 'BP: 120/80, normal', plan: 'Lifestyle counseling', diagnosis: 'Well adult', status: 'Pending', physician: '', createdAt: '2026-04-18T11:00:00', documentUploaded: false, documentName: null },
];

export const initialLOAs = [
  { id: 'L-005049', serialNo: '005049', consultationId: 'C-000284', memberId: 'M001', hospital: 'WUP-H', procedures: 'Complete Blood Count, Urinalysis', approvedAmount: 1500, requestingDoctor: 'Dr. A. Mendoza', status: 'Used', dateIssued: '2026-03-10', validity: 7, clinicalImpression: 'Anemia, r/o HPN', rbPerDay: '', mbl: '1500' },
  { id: 'L-005050', serialNo: '005050', consultationId: 'C-000285', memberId: 'M002', hospital: 'WUP-H', procedures: 'Chest X-ray PA view, CBC', approvedAmount: 2800, requestingDoctor: 'Dr. R. Garcia', status: 'Used', dateIssued: '2026-03-12', validity: 7, clinicalImpression: 'Bronchitis', rbPerDay: '', mbl: '2800' },
  { id: 'L-005051', serialNo: '005051', consultationId: 'C-000286', memberId: 'M004', hospital: 'Premiere Medical Center', procedures: 'CBC, Urinalysis, Abdominal Ultrasound', approvedAmount: 8500, requestingDoctor: 'Dr. L. Rivera', status: 'Used', dateIssued: '2026-03-18', validity: 7, clinicalImpression: 'R/O Appendicitis', rbPerDay: '2500', mbl: '8500' },
  { id: 'L-005052', serialNo: '005052', consultationId: 'C-000287', memberId: 'M001', hospital: 'WUP-H', procedures: 'Complete Blood Count repeat', approvedAmount: 500, requestingDoctor: 'Dr. A. Mendoza', status: 'Approved', dateIssued: '2026-04-02', validity: 7, clinicalImpression: 'IDA, follow-up', rbPerDay: '', mbl: '500' },
  { id: 'L-005053', serialNo: '005053', consultationId: 'C-000289', memberId: 'M006', hospital: 'WUP-H', procedures: 'Lumbar X-ray APL', approvedAmount: 1800, requestingDoctor: 'Dr. A. Mendoza', status: 'Pending', dateIssued: '2026-04-15', validity: 7, clinicalImpression: 'Mechanical back pain', rbPerDay: '', mbl: '1800' },
];

export const initialSOAs = [
  { id: 'S001', loaId: 'L-005049', memberId: 'M001', dateUploaded: '2026-03-15', laboratory: 800, xray: 0, medicines: 450, others: 250, total: 1500, document: 'SOA_005049.pdf', remarks: 'Lab tests completed', status: 'Reviewed', reviewedBy: 'Maria Santos', reviewedAt: '2026-03-16' },
  { id: 'S002', loaId: 'L-005050', memberId: 'M002', dateUploaded: '2026-03-18', laboratory: 600, xray: 1800, medicines: 400, others: 0, total: 2800, document: 'SOA_005050.pdf', remarks: 'Chest x-ray and CBC', status: 'Reviewed', reviewedBy: 'Maria Santos', reviewedAt: '2026-03-19' },
  { id: 'S003', loaId: 'L-005051', memberId: 'M004', dateUploaded: '2026-03-22', laboratory: 1200, xray: 0, medicines: 1800, others: 5500, total: 8500, document: 'SOA_005051.pdf', remarks: 'Ultrasound and meds', status: 'Pending', reviewedBy: null, reviewedAt: null },
];

export const initialSystemUsers = [
  { id: 'U001', name: 'IT Administrator', username: 'admin', password: 'admin123', email: 'it@wup.edu.ph', role: 'admin', active: true, memberId: null, lastLogin: '2026-04-19', createdAt: '2024-01-01' },
  { id: 'U002', name: 'Maria Santos', username: 'coordinator', password: 'coord123', email: 'maria.santos@wup.edu.ph', role: 'coordinator', active: true, memberId: null, lastLogin: '2026-04-20', createdAt: '2024-01-15' },
  { id: 'U003', name: 'Dr. Vibelle Reyes', username: 'director', password: 'director123', email: 'vreyes@wup.edu.ph', role: 'director', active: true, memberId: null, lastLogin: '2026-04-19', createdAt: '2023-08-20' },
  { id: 'U004', name: 'Pedro Gonzales', username: 'p.gonzales', password: 'coord456', email: 'pgonzales@wup.edu.ph', role: 'coordinator', active: false, memberId: null, lastLogin: '2026-02-14', createdAt: '2024-06-10' },
  { id: 'U005', name: 'Carmelita Tiglao', username: 'c.tiglao', password: 'member123', email: 'c.tiglao@wesleyan.edu.ph', role: 'member', active: true, memberId: 'M001', lastLogin: '2026-04-18', createdAt: '2024-01-20' },
  { id: 'U006', name: 'Mark Steven Reyes', username: 'm.reyes', password: 'member456', email: 'm.reyes@wesleyan.edu.ph', role: 'member', active: true, memberId: 'M002', lastLogin: '2026-04-10', createdAt: '2024-02-15' },
];

export const initialAuditLogs = [
  { id: 'A001', timestamp: '2026-04-20T08:15:00', user: 'Maria Santos', role: 'coordinator', action: 'Login', description: 'Signed in to WeCare', ip: '192.168.1.42' },
  { id: 'A002', timestamp: '2026-04-20T08:22:00', user: 'Maria Santos', role: 'coordinator', action: 'Create', description: 'Created consultation CS-000284 for Carmelita Tiglao', ip: '192.168.1.42' },
  { id: 'A003', timestamp: '2026-04-20T09:05:00', user: 'Dr. Vibelle Reyes', role: 'director', action: 'Approve', description: 'Approved LOA L-005050 — WUP-H diagnostic exam', ip: '192.168.1.88' },
  { id: 'A004', timestamp: '2026-04-19T14:30:00', user: 'IT Administrator', role: 'admin', action: 'Update', description: 'Updated system coverage limit to ₱150,000', ip: '192.168.1.10' },
  { id: 'A005', timestamp: '2026-04-19T10:12:00', user: 'Maria Santos', role: 'coordinator', action: 'Create', description: 'Uploaded SOA for Ana Bautista', ip: '192.168.1.42' },
  { id: 'A006', timestamp: '2026-04-18T16:45:00', user: 'Dr. Vibelle Reyes', role: 'director', action: 'Reject', description: 'Rejected LOA L-005048 — insufficient documentation', ip: '192.168.1.88' },
  { id: 'A007', timestamp: '2026-04-18T11:20:00', user: 'Carmelita Tiglao', role: 'member', action: 'Login', description: 'Signed in to member portal', ip: '203.177.12.45' },
  { id: 'A008', timestamp: '2026-04-17T15:30:00', user: 'IT Administrator', role: 'admin', action: 'Create', description: 'Created new user account: Pedro Gonzales', ip: '192.168.1.10' },
  { id: 'A009', timestamp: '2026-04-17T09:00:00', user: 'Maria Santos', role: 'coordinator', action: 'Update', description: 'Updated member info: Roberto Santos', ip: '192.168.1.42' },
  { id: 'A010', timestamp: '2026-04-16T13:15:00', user: 'Dr. Vibelle Reyes', role: 'director', action: 'Approve', description: 'Approved LOA L-005049', ip: '192.168.1.88' },
  { id: 'A011', timestamp: '2026-04-15T10:00:00', user: 'IT Administrator', role: 'admin', action: 'Delete', description: 'Deleted inactive user: Test Account', ip: '192.168.1.10' },
  { id: 'A012', timestamp: '2026-04-14T14:00:00', user: 'Maria Santos', role: 'coordinator', action: 'Create', description: 'Registered new member: Jennifer Cruz', ip: '192.168.1.42' },
];

export const initialSettings = {
  coverageLimit: 150000,
  memberConsultLimit: 24,
  dependentConsultLimit: 4,
  loaValidityDays: 7,
  lowBalanceThreshold: 30000,
  programYearStart: 'January',
  orgName: 'Wesleyan University — Philippines',
  primaryContact: 'Maria Santos',
  primaryEmail: 'wecare@wup.edu.ph',
  requireMFA: false,
  autoLogout: true,
  strongPasswords: true,
  auditAllActions: true,
};

export const COVERAGE_LIMIT = 150000;
export const MEMBER_CONSULTATION_LIMIT = 24;
export const DEPENDENT_CONSULTATION_LIMIT = 4;
