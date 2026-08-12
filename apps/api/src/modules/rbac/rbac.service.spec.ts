import { RbacService } from './rbac.service';

describe('RbacService', () => {
  it('allows owners to manage organizations', () => {
    const service = new RbacService();
    expect(service.can('OWNER', 'ORG_MANAGE')).toBe(true);
  });

  it('denies viewers from administrative actions', () => {
    const service = new RbacService();
    expect(service.can('VIEWER', 'ORG_MANAGE')).toBe(false);
  });
});
