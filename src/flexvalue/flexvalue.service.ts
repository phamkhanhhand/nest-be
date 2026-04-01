import { Injectable } from '@nestjs/common';

@Injectable()
export class FlexvalueService {

  getHello(): string {
    return 'Hello nest!';
  }

}
