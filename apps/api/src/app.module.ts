import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { PolicyEngineModule } from './modules/policy-engine/policy-engine.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    OrganizationsModule,
    RbacModule,
    ClassificationModule,
    PolicyEngineModule,
    GatewayModule,
    AuditModule
  ],
  controllers: [HealthController],
  providers: []
})
export class AppModule {}
