// ============================================
// FRONTEND-ONLY API SERVICE (LOCAL STORAGE)
// ============================================

// Helper to generate unique IDs
const generateId = (prefix) => `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Initialize localStorage with mock data on first load
const initializeMockData = () => {
  if (localStorage.getItem('wecare_initialized')) return;

  // Mock users
  const mockUsers = [
    { id:'U001', name:'IT Administrator', username:'admin', password:'admin123', email:'it@wup.edu.ph', role:'admin', active:true, memberId:null, lastLogin:'2026-04-20', createdAt:'2024-01-01' },
    { id:'U002', name:'Maria Santos', username:'coordinator', password:'coord123', email:'maria.santos@wup.edu.ph', role:'coordinator', active:true, memberId:null, lastLogin:'2026-04-21', createdAt:'2024-01-15' },
    { id:'U003', name:'Dr. Vibelle Reyes', username:'director', password:'director123', email:'vreyes@wup.edu.ph', role:'director', active:true, memberId:null, lastLogin:'2026-04-20', createdAt:'2023-08-20' },
    { id:'U006', name:'Juan Dela Cruz', username:'j.delacruz', password:'member123', email:'j.delacruz@wesleyan.edu.ph', role:'member', active:true, memberId:'M001', lastLogin:'2026-04-18', createdAt:'2024-01-20' },
    { id:'U007', name:'Mark Steven Reyes', username:'m.reyes', password:'member123', email:'m.reyes@wesleyan.edu.ph', role:'member', active:true, memberId:'M002', lastLogin:'2026-04-10', createdAt:'2024-02-15' },
  ];

  // Mock members
  const mockMembers = [
    { id:'M001', employeeId:'2024-001', name:'Juan Dela Cruz', department:'College of Nursing', status:'Permanent', photo:null, email:'j.delacruz@wesleyan.edu.ph', phone:'0917-555-0101', age:48, gender:'Male', civilStatus:'Single', dateHired:'2010-06-15', active:true, approvalStatus:'Approved', approvedBy:'Maria Santos', approvedAt:'2024-01-20', dependents:[] },
    { id:'M002', employeeId:'2024-002', name:'Mark Steven Reyes', department:'College of Engineering', status:'Permanent', photo:null, email:'m.reyes@wesleyan.edu.ph', phone:'0917-555-0102', age:39, gender:'Male', dateHired:'2015-08-01', active:true, approvalStatus:'Approved', approvedBy:'Maria Santos', approvedAt:'2024-02-15', dependents:[] },
    { id:'M003', employeeId:'2024-003', name:'Ana Luisa Bautista', department:'College of Arts & Sciences', status:'Permanent', photo:null, email:'a.bautista@wesleyan.edu.ph', phone:'0917-555-0103', age:34, gender:'Female', dateHired:'2020-01-10', active:true, approvalStatus:'Approved', approvedBy:'Maria Santos', approvedAt:'2024-03-01', dependents:[] },
  ];

  // Mock consultations
  const mockConsultations = [
    { id:'C001', serialNo:'000200', memberId:'M001', dependentId:null, date:'2025-10-03', patientType:'Consultation', chiefComplaints:'Persistent headache, dizziness for 1 week', peFindings:'BP 140/90, mild pallor, no focal deficits', plan:'CBC, UA, lipid profile; refer to Internal Medicine', diagnosis:'Hypertension Stage 1, r/o anemia', status:'Completed', physician:'Dr. A. Mendoza', documentUploaded:true, documentName:'consultation_report.pdf', documentData:null, createdAt:'2025-10-02T10:00:00Z', requestedBy:'Carmelita Tiglao', approvedBy:'Maria Santos', approvedAt:'2025-10-02T14:00:00Z' },
    { id:'C002', serialNo:'000201', memberId:'M002', dependentId:null, date:'2025-10-07', patientType:'Outpatient', chiefComplaints:'Knee pain and swelling after PE class', peFindings:'Right knee effusion, limited ROM, no instability', plan:'Knee X-ray AP/Lat, NSAIDs, ice compress, restrict activity', diagnosis:'Traumatic synovitis, right knee', status:'Completed', physician:'Dr. E. Tan', documentUploaded:true, documentName:'knee_xray.pdf', documentData:null, createdAt:'2025-10-06T09:00:00Z', requestedBy:'Mark Steven Reyes', approvedBy:'Maria Santos', approvedAt:'2025-10-06T15:00:00Z' },
  ];

  // Mock LOAs
  const mockLoas = [
    { id:'LOA001', memberId:'M001', type:'Medical', startDate:'2025-10-01', endDate:'2025-10-07', reason:'Medical consultation', status:'Approved', approvedBy:'Maria Santos', approvedAt:'2025-09-30' },
  ];

  // Mock SOAs
  const mockSoas = [
    { id:'SOA001', memberId:'M001', dateSubmitted:'2025-10-15', procedures:[], totalAmount:5000, status:'Pending', reviewedBy:null, reviewedAt:null },
  ];

  // Mock settings
  const mockSettings = {
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

  // Mock audit logs
  const mockAuditLogs = [
    { id:'A001', userId:'U001', action:'System initialized', timestamp:'2026-04-23T12:00:00Z', details:'Frontend-only mode' },
  ];

  localStorage.setItem('wecare_users', JSON.stringify(mockUsers));
  localStorage.setItem('wecare_members', JSON.stringify(mockMembers));
  localStorage.setItem('wecare_consultations', JSON.stringify(mockConsultations));
  localStorage.setItem('wecare_loas', JSON.stringify(mockLoas));
  localStorage.setItem('wecare_soas', JSON.stringify(mockSoas));
  localStorage.setItem('wecare_settings', JSON.stringify(mockSettings));
  localStorage.setItem('wecare_audit_logs', JSON.stringify(mockAuditLogs));
  localStorage.setItem('wecare_initialized', 'true');
};

// Initialize on load
initializeMockData();

// Helper to get data from localStorage
const getData = (key, defaultValue = []) => {
  try {
    return JSON.parse(localStorage.getItem(`wecare_${key}`) || JSON.stringify(defaultValue));
  } catch {
    return defaultValue;
  }
};

// Helper to save data to localStorage
const saveData = (key, data) => {
  localStorage.setItem(`wecare_${key}`, JSON.stringify(data));
};

// Helper to add audit log
const addAuditLog = (userId, action, details = {}) => {
  const logs = getData('audit_logs', []);
  logs.push({
    id: generateId('A'),
    userId,
    action,
    timestamp: new Date().toISOString(),
    details,
  });
  saveData('audit_logs', logs);
};

// Simulate async API calls with delays
const asyncDelay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth
  login: async (credentials) => {
    await asyncDelay();
    const users = getData('users', []);
    const user = users.find(u => (u.username === credentials.username || u.email === credentials.username) && u.password === credentials.password);
    
    if (!user) {
      throw new Error('Invalid username or password. Please check your credentials.');
    }
    if (!user.active) {
      throw new Error('Your account has been disabled. Please contact IT Administrator.');
    }
    if (user.role === 'member') {
      const members = getData('members', []);
      const member = members.find(m => m.id === user.memberId);
      if (!member) {
        throw new Error('Associated member record not found.');
      }
      if (member.approvalStatus !== 'Approved') {
        throw new Error('Your account is awaiting approval. Please wait for Coordinator approval before logging in.');
      }
    }

    const token = btoa(JSON.stringify({ id: user.id, role: user.role, name: user.name, memberId: user.memberId }));
    localStorage.setItem('wecare_token', token);
    addAuditLog(user.id, 'User login', { username: user.username });

    const members = getData('members', []);
    const photo = user.photo || (user.role === 'member' ? members.find(m => m.id === user.memberId)?.photo : null) || null;
    return { token, user: { id: user.id, name: user.name, role: user.role, email: user.email, memberId: user.memberId, photo } };
  },

  register: async (data) => {
    await asyncDelay();
    const users = getData('users', []);
    const members = getData('members', []);
    
    if (users.find(u => u.username === data.username || u.email === data.email)) {
      throw new Error('Username or email already exists.');
    }

    // Create user account
    const newUser = {
      id: generateId('U'),
      name: data.name,
      username: data.username || data.email.split('@')[0],
      password: data.password,
      email: data.email,
      phone: data.phone,
      role: 'member',
      active: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Create member profile with Pending status
    const newMember = {
      id: generateId('M'),
      employeeId: data.employeeId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      age: data.age,
      gender: data.gender,
      civilStatus: data.civilStatus || 'Single',
      status: 'Permanent',
      photo: data.photo || null,
      dateHired: new Date().toISOString().split('T')[0],
      active: true,
      approvalStatus: 'Pending',
      approvedBy: null,
      approvedAt: null,
      dependents: data.dependents || [],
      createdAt: new Date().toISOString(),
    };

    // Link user to member
    newUser.memberId = newMember.id;

    users.push(newUser);
    members.push(newMember);
    saveData('users', users);
    saveData('members', members);
    addAuditLog(newUser.id, 'User registration', { email: data.email, memberId: newMember.id });

    return { success: true, message: 'Registration successful. Awaiting coordinator approval.' };
  },

  changePassword: async (data) => {
    await asyncDelay();
    const token = localStorage.getItem('wecare_token');
    if (!token) throw new Error('Not authenticated');

    const users = getData('users', []);
    const decoded = JSON.parse(atob(token));
    const user = users.find(u => u.id === decoded.id);

    if (!user || user.password !== data.currentPassword) {
      throw new Error('Current password is incorrect.');
    }

    user.password = data.newPassword;
    saveData('users', users);
    addAuditLog(user.id, 'Password changed');

    return { success: true };
  },

  updatePhoto: async (photo) => {
    await asyncDelay();
    const token = localStorage.getItem('wecare_token');
    if (!token) throw new Error('Not authenticated');

    const decoded = JSON.parse(atob(token));
    const users = getData('users', []);
    const user = users.find(u => u.id === decoded.id);
    if (!user) throw new Error('User not found');

    user.photo = photo;
    saveData('users', users);

    if (user.role === 'member' && user.memberId) {
      const members = getData('members', []);
      const member = members.find(m => m.id === user.memberId);
      if (member) {
        member.photo = photo;
        saveData('members', members);
      }
    }

    addAuditLog(user.id, 'Profile photo updated');
    return { photo };
  },

  // Members
  getMembers: async () => {
    await asyncDelay();
    return getData('members', []);
  },

  createMember: async (data) => {
    await asyncDelay();
    const members = getData('members', []);
    const newMember = { id: generateId('M'), ...data, createdAt: new Date().toISOString() };
    members.push(newMember);
    saveData('members', members);
    return newMember;
  },

  updateMember: async (id, data) => {
    await asyncDelay();
    const members = getData('members', []);
    const member = members.find(m => m.id === id);
    if (!member) throw new Error('Member not found');
    Object.assign(member, data);
    saveData('members', members);
    return member;
  },

  deleteMember: async (id) => {
    await asyncDelay();
    const members = getData('members', []);
    const filtered = members.filter(m => m.id !== id);
    saveData('members', filtered);
    return { success: true };
  },

  approveMember: async (id) => {
    await asyncDelay();
    const members = getData('members', []);
    const member = members.find(m => m.id === id);
    if (!member) throw new Error('Member not found');
    member.approvalStatus = 'Approved';
    member.approvedAt = new Date().toISOString();
    saveData('members', members);
    return member;
  },

  rejectMember: async (id, reason) => {
    await asyncDelay();
    const members = getData('members', []);
    const member = members.find(m => m.id === id);
    if (!member) throw new Error('Member not found');
    member.approvalStatus = 'Rejected';
    member.rejectionReason = reason;
    saveData('members', members);
    return member;
  },

  // Consultations
  getConsultations: async () => {
    await asyncDelay();
    return getData('consultations', []);
  },

  createConsultation: async (data) => {
    await asyncDelay();
    const consultations = getData('consultations', []);
    const newConsult = { id: generateId('C'), ...data, createdAt: new Date().toISOString() };
    consultations.push(newConsult);
    saveData('consultations', consultations);
    return newConsult;
  },

  updateConsultation: async (id, data) => {
    await asyncDelay();
    const consultations = getData('consultations', []);
    const consult = consultations.find(c => c.id === id);
    if (!consult) throw new Error('Consultation not found');
    Object.assign(consult, data);
    saveData('consultations', consultations);
    return consult;
  },

  deleteConsultation: async (id) => {
    await asyncDelay();
    const consultations = getData('consultations', []);
    const filtered = consultations.filter(c => c.id !== id);
    saveData('consultations', filtered);
    return { success: true };
  },

  // LOAs
  getLoas: async () => {
    await asyncDelay();
    return getData('loas', []);
  },

  createLoa: async (data) => {
    await asyncDelay();
    const loas = getData('loas', []);
    const newLoa = { id: generateId('LOA'), ...data, createdAt: new Date().toISOString() };
    loas.push(newLoa);
    saveData('loas', loas);
    return newLoa;
  },

  updateLoa: async (id, data) => {
    await asyncDelay();
    const loas = getData('loas', []);
    const loa = loas.find(l => l.id === id);
    if (!loa) throw new Error('LOA not found');
    Object.assign(loa, data);
    saveData('loas', loas);
    return loa;
  },

  // SOAs
  getSoas: async () => {
    await asyncDelay();
    return getData('soas', []);
  },

  createSoa: async (data) => {
    await asyncDelay();
    const soas = getData('soas', []);
    const newSoa = { id: generateId('SOA'), ...data, createdAt: new Date().toISOString() };
    soas.push(newSoa);
    saveData('soas', soas);
    return newSoa;
  },

  reviewSoa: async (id) => {
    await asyncDelay();
    const soas = getData('soas', []);
    const soa = soas.find(s => s.id === id);
    if (!soa) throw new Error('SOA not found');
    soa.status = 'Approved';
    soa.reviewedAt = new Date().toISOString();
    saveData('soas', soas);
    return soa;
  },

  rejectSoa: async (id) => {
    await asyncDelay();
    const soas = getData('soas', []);
    const soa = soas.find(s => s.id === id);
    if (!soa) throw new Error('SOA not found');
    soa.status = 'Rejected';
    saveData('soas', soas);
    return soa;
  },

  // Users (admin)
  getUsers: async () => {
    await asyncDelay();
    return getData('users', []);
  },

  createUser: async (data) => {
    await asyncDelay();
    const users = getData('users', []);
    const newUser = { id: generateId('U'), ...data, createdAt: new Date().toISOString() };
    users.push(newUser);
    saveData('users', users);
    return newUser;
  },

  updateUser: async (id, data) => {
    await asyncDelay();
    const users = getData('users', []);
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    Object.assign(user, data);
    saveData('users', users);
    return user;
  },

  deleteUser: async (id) => {
    await asyncDelay();
    const users = getData('users', []);
    const filtered = users.filter(u => u.id !== id);
    saveData('users', filtered);
    return { success: true };
  },

  // Audit
  getAudit: async () => {
    await asyncDelay();
    return getData('audit_logs', []);
  },

  // Settings
  getSettings: async () => {
    await asyncDelay();
    return getData('settings', {
      coverageLimit: 150000,
      memberConsultLimit: 24,
      dependentConsultLimit: 4,
      loaValidityDays: 7,
      lowBalanceThreshold: 30000,
      programYearStart: 'January',
      orgName: 'Wesleyan University — Philippines',
      primaryContact: 'Maria Santos',
      primaryEmail: 'wecare@wup.edu.ph',
    });
  },

  updateSettings: async (data) => {
    await asyncDelay();
    saveData('settings', data);
    return data;
  },
};
