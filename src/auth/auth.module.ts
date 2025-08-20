import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [JwtModule.register({
        secret: "69Z}r}!P#|266>E6=k4uZp/Te=?=b.`B"
    }),
    UserModule,
    PrismaModule
],
    providers: [AuthService],
    controllers: [AuthController]
})

export class AuthModule {

}