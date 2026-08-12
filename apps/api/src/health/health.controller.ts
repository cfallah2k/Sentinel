import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'sentinel-api'
    };
  }

  @Get('live')
  getLiveness() {
    return { status: 'live' };
  }

  @Get('ready')
  getReadiness() {
    return { status: 'ready' };
  }
}
