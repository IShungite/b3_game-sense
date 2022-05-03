import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { IAuthPayload } from "./models/auth.models";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "SECRET", // TODO: PUT THIS IN ENV VAR
    });
  }

  async validate(payload: IAuthPayload) {
    // If we need to send more data to the client:
    const user = await this.usersService.findById(payload.sub);
    return { id: payload.sub, email: payload.email, roles: user.roles };
  }
}
