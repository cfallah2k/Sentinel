import { Controller, Post, Body } from '@nestjs/common';
import { PolicyEngineService } from './policy-engine.service';

@Controller('policy-engine')
export class PolicyEngineController {
  constructor(private readonly policyEngineService: PolicyEngineService) {}

  @Post('evaluate')
  evaluate(@Body() body: any) {
    return this.policyEngineService.evaluate(body);
  }
}
