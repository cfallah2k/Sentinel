import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
  it('creates an organization with an owner member', () => {
    const service = new OrganizationsService();

    const org = service.create({
      id: 'org-123',
      name: 'Northwind Labs',
      ownerId: 'user-1'
    });

    expect(org.id).toBe('org-123');
    expect(org.name).toBe('Northwind Labs');
    expect(service.getMembers('org-123')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-1', role: 'OWNER' })
      ])
    );
  });

  it('adds a member to an existing organization', () => {
    const service = new OrganizationsService();
    service.create({ id: 'org-456', name: 'Apex Health', ownerId: 'user-9' });

    service.addMember('org-456', { userId: 'user-10', role: 'ADMIN' });

    expect(service.getMembers('org-456')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-10', role: 'ADMIN' })
      ])
    );
  });
});
