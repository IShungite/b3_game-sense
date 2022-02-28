import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Post("register")
  register(@Body() createUserDto: CreateUserDto): any {
    return this.authService.register(createUserDto);
  }
}
