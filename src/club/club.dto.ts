import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
export class ClubDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly foundationDate: number;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}