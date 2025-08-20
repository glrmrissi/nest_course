import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly refletor: Reflector
    ){}
    async canActivate(context: ExecutionContext) {
        const requeridRoles = this.refletor.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        
        if(!requeridRoles) {
            return true;
        }
        
        const {user} = context.switchToHttp().getRequest();
        
        console.log({requeridRoles, user});
        return true;
    }
}