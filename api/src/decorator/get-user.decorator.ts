import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUserRequest } from "src/auth/models/auth.models";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): IUserRequest => {
  const req = ctx.switchToHttp().getRequest();
  console.log("user", req.user);
  return req.user;
});
