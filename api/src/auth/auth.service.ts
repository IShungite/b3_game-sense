import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { IAuthUser } from "./models/auth.models";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<IAuthUser> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const _id = user._id.toString();
      const { email } = user;
      return { email, _id };
    }

    return null;
  }
}
