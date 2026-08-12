import { Module } from '@nestjs/common';
import { PolicyEngineController } from './policy-engine.controller';
import { PolicyEngineService } from './policy-engine.service';

@Module({
  controllers: [PolicyEngineController],
  providers: [PolicyEngineService],
  exports: [PolicyEngineService]
})
export class PolicyEngineModule {}
