import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
export class SocioDto {

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    readonly birthDate: number;
}