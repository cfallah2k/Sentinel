import { Controller, Post, Body } from '@nestjs/common';
import { ClassificationService } from './classification.service';

class ClassifyRequestDto {
  value!: string;
}

@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post()
  classify(@Body() body: ClassifyRequestDto) {
    return this.classificationService.detect(body.value);
  }
}
