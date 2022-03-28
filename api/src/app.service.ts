import { Get, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  getHelloProtected(): string {
    return "Hello World Protected";
  }
}
