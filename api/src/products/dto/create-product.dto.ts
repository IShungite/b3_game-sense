import { IsCurrency, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {

    readonly shop_id: number;

    @MinLength(3)
    @MaxLength(30)    
    readonly name: string;

    @IsCurrency()
    readonly price: number;

    @MinLength(3)
    @MaxLength(5000)
    readonly description: string;

}
