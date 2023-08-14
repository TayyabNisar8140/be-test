import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  checkServerBeat(): string {
    return 'Server is up and running';
  }
}
