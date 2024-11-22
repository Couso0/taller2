import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    contact: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    address: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    city: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    postalCode: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    country: string;
}
