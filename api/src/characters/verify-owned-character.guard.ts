import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { IUserRequest } from "src/auth/models/auth.models";
import { CharactersService } from "src/characters/characters.service";

@Injectable()
export class VerifyOwnedCharacterGuards implements CanActivate {
  constructor(private readonly characterService: CharactersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, body }: { user: IUserRequest; body: any } = context.switchToHttp().getRequest();

    const character = await this.characterService.findOne({
      _id: body.characterId,
      userId: user.id,
      promotionId: body.promotionId,
    });
    console.log("le charatecter du owned guard :" + character, user);
    return character ? true : false;
  }
}
