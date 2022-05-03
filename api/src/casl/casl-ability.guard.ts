import { ForbiddenError } from "@casl/ability";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IUserRequest } from "src/auth/models/auth.models";
import { CHECK_ABILITY, RequiredRule } from "./casl-ability.decorator";
import { CaslAbilityFactory } from "./casl-ability.factory";

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly caslAbilityFactory: CaslAbilityFactory) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the meta data that we set in the controller
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];

    // Get the user from the request (from the JWT)
    const { user }: { user: IUserRequest } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject));
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
    return false;
  }
}
