import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  record(event: { type: string; result: string; metadata?: Record<string, unknown> }) {
    return {
      id: `audit-${Date.now()}`,
      event_type: event.type,
      result: event.result,
      metadata: event.metadata ?? {},
      timestamp: new Date().toISOString()
    };
  }
}
