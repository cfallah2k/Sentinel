import { Controller, Post, Body } from '@nestjs/common';

class GatewayRequestDto {
  value!: string;
  providerName?: string;
}

@Controller('gateway')
export class GatewayController {
  @Post('chat/completions')
  evaluate(@Body() body: GatewayRequestDto) {
    return {
      decision: body.value.includes('LR-123456') ? 'BLOCK' : body.value.includes('071') ? 'REDACT' : 'ALLOW',
      request_id: 'demo-request-01',
      provider: body.providerName || 'external-ai-provider',
      message: 'Sentinel gateway evaluation completed.'
    };
  }
}
