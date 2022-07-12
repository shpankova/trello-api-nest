import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class JoiValidatorPipe implements PipeTransform {
  constructor(private schema) {}

  transform(value: any) {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details
        .map((d: { message: any }) => d.message)
        .join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
