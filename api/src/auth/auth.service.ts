import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { IAuthLoginResponse, IAuthPayload, IAuthUser } from "./models/auth.models";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<IAuthUser> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const _id = user._id.toString();
      const { email } = user;
      return { email, _id };
    }

    return null;
  }

  async login(user: IAuthUser): Promise<IAuthLoginResponse> {
    const payload: IAuthPayload = { email: user.email, sub: user._id };
    return {
      id: user._id,
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto);
  }
}
