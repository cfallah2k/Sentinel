import { Controller, Post, Body } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('events')
  create(@Body() body: { type: string; result: string; metadata?: Record<string, unknown> }) {
    return this.auditService.record(body);
  }
}
