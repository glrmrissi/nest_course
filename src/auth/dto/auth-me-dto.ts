import { IsJWT } from "class-validator";

export class AuthMeTokenDTO{
    @IsJWT()
    token: string;
}