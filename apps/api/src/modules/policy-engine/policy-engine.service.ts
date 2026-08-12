import { Injectable } from '@nestjs/common';
import { DefaultPolicyEngine } from '@sentinel/policy-engine';

@Injectable()
export class PolicyEngineService {
  evaluate(input: any) {
    return DefaultPolicyEngine.evaluate(input);
  }
}
