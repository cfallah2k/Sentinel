import { randomUUID, scryptSync, timingSafeEqual } from 'crypto';

export type AuthRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'VIEWER';

export interface RegisterUserInput {
  email: string;
  password: string;
  fullName: string;
  organizationId: string;
  role?: AuthRole;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  organizationId: string;
  role: AuthRole;
  passwordHash: string;
}

export class AuthService {
  private readonly users = new Map<string, AuthUser>();

  async register(input: RegisterUserInput): Promise<AuthUser> {
    const email = input.email.toLowerCase();
    if (this.users.has(email)) {
      throw new Error('User already exists');
    }

    const user: AuthUser = {
      id: randomUUID(),
      email,
      fullName: input.fullName,
      organizationId: input.organizationId,
      role: input.role ?? 'VIEWER',
      passwordHash: this.hashPassword(input.password)
    };

    this.users.set(email, user);
    return { ...user };
  }

  async login(email: string, password: string): Promise<Omit<AuthUser, 'passwordHash'> | null> {
    const user = this.users.get(email.toLowerCase());
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!this.verifyPassword(password, user.passwordHash)) {
      throw new Error('Invalid credentials');
    }

    const { passwordHash: _passwordHash, ...safeUser } = user;
    return safeUser;
  }

  private hashPassword(password: string): string {
    const salt = randomUUID().replace(/-/g, '').slice(0, 16);
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `$scrypt$${salt}$${hash}`;
  }

  private verifyPassword(password: string, hash: string): boolean {
    const [, algorithm, salt, storedHash] = hash.split('$');
    if (!algorithm || !salt || !storedHash || algorithm !== 'scrypt') {
      return false;
    }

    const computedHash = scryptSync(password, salt, 64);
    const storedBuffer = Buffer.from(storedHash, 'hex');

    try {
      return timingSafeEqual(computedHash, storedBuffer);
    } catch {
      return false;
    }
  }
}
