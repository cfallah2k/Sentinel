export type OrgRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'VIEWER';

export interface OrganizationInput {
  id: string;
  name: string;
  ownerId: string;
}

export interface OrganizationMember {
  userId: string;
  role: OrgRole;
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  members: OrganizationMember[];
}

export class OrganizationsService {
  private readonly organizations = new Map<string, Organization>();

  create(input: OrganizationInput): Organization {
    const org: Organization = {
      id: input.id,
      name: input.name,
      ownerId: input.ownerId,
      members: [{ userId: input.ownerId, role: 'OWNER' }]
    };

    this.organizations.set(input.id, org);
    return { ...org, members: [...org.members] };
  }

  getById(id: string): Organization | undefined {
    const org = this.organizations.get(id);
    return org ? { ...org, members: [...org.members] } : undefined;
  }

  getMembers(id: string): OrganizationMember[] {
    const org = this.organizations.get(id);
    return org ? [...org.members] : [];
  }

  addMember(id: string, member: OrganizationMember): Organization {
    const org = this.organizations.get(id);
    if (!org) {
      throw new Error('Organization not found');
    }

    if (org.members.some((current) => current.userId === member.userId)) {
      org.members = org.members.map((current) =>
        current.userId === member.userId ? { ...current, role: member.role } : current
      );
    } else {
      org.members.push(member);
    }

    return { ...org, members: [...org.members] };
  }
}
