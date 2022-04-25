export class CreateItemDto {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly type: string;
  readonly isStarter: boolean;
  readonly price: number;
}
