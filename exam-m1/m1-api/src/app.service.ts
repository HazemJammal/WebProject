import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello(): string {
    return 'Hello World!';
  }

  public greetMe(name: string): string {
    return `Hel22ssloss ${name}`;
  }

}
