import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('hashes passwords and allows successful login', async () => {
    const service = new AuthService();
    const user = await service.register({
      email: 'admin@example.com',
      password: 'StrongPassword123!',
      fullName: 'Admin User',
      organizationId: 'org-1'
    });

    expect(user.email).toBe('admin@example.com');
    expect(user.passwordHash).not.toBe('StrongPassword123!');
    expect(user.passwordHash).toContain('$scrypt$');

    const result = await service.login('admin@example.com', 'StrongPassword123!');
    expect(result).not.toBeNull();
    expect(result?.email).toBe('admin@example.com');
  });

  it('rejects invalid credentials', async () => {
    const service = new AuthService();
    await service.register({
      email: 'security@example.com',
      password: 'StrongPassword123!',
      fullName: 'Security User',
      organizationId: 'org-1'
    });

    await expect(service.login('security@example.com', 'wrong-password')).rejects.toThrow('Invalid credentials');
  });
});
