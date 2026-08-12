import { Injectable } from '@nestjs/common';
import { DefaultClassifier } from '@sentinel/classifier';

@Injectable()
export class ClassificationService {
  detect(input: string) {
    return DefaultClassifier.detect(input);
  }
}
