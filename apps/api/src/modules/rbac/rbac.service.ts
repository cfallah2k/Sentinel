export type RbacRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'VIEWER';
export type Permission = 'ORG_MANAGE' | 'USER_MANAGE' | 'DATA_VIEW' | 'DATA_EXPORT';

const ROLE_PERMISSIONS: Record<RbacRole, Permission[]> = {
  OWNER: ['ORG_MANAGE', 'USER_MANAGE', 'DATA_VIEW', 'DATA_EXPORT'],
  ADMIN: ['USER_MANAGE', 'DATA_VIEW', 'DATA_EXPORT'],
  MANAGER: ['DATA_VIEW', 'DATA_EXPORT'],
  VIEWER: ['DATA_VIEW']
};

export class RbacService {
  can(role: RbacRole, permission: Permission): boolean {
    return (ROLE_PERMISSIONS[role] ?? []).includes(permission);
  }
}
