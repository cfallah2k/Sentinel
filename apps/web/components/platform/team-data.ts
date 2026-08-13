export interface MemberGroup {
  id: string;
  name: string;
  description: string;
  type: 'Security' | 'Data' | 'Engineering' | 'Executive';
  members: number;
  role: string;
  createdAt: string;
  managed: boolean;
}

export const memberGroups: MemberGroup[] = [
  { id: 'grp-1', name: 'Security Operations', description: 'SOC analysts and incident responders with gateway and policy access.', type: 'Security', members: 6, role: 'SECURITY_ANALYST', createdAt: '2026-02-11', managed: true },
  { id: 'grp-2', name: 'Data Governance', description: 'Data stewards responsible for classification and retention.', type: 'Data', members: 4, role: 'PRIVACY_OFFICER', createdAt: '2026-03-02', managed: true },
  { id: 'grp-3', name: 'Platform Engineering', description: 'Engineers owning applications, keys and SDK integrations.', type: 'Engineering', members: 9, role: 'DEVELOPER', createdAt: '2026-01-20', managed: true },
  { id: 'grp-4', name: 'Executive Oversight', description: 'Leadership with read-only visibility across the org.', type: 'Executive', members: 3, role: 'VIEWER', createdAt: '2026-04-15', managed: false },
  { id: 'grp-5', name: 'Compliance & Audit', description: 'Auditors and compliance officers reviewing controls and evidence.', type: 'Security', members: 5, role: 'AUDITOR', createdAt: '2026-05-08', managed: false }
];

export const accessRequestStatuses = ['Pending', 'Approved', 'Denied', 'Expired'] as const;
