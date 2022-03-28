import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { IUserRequest } from "src/auth/models/auth.models";
import { Role } from "src/auth/models/roles.enum";
import { Grade } from "src/grades/schemas/grade.schema";
import { User } from "src/users/schemas/user.schema";

export type Subjects = InferSubjects<typeof Grade | typeof User> | "all";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: IUserRequest) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user.roles.includes(Role.Super_Admin)) {
      can(Action.Manage, "all"); // read-write access to everything
    }

    can(Action.Read, Grade);
    cannot(Action.Delete, Grade);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
