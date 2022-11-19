import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import {Observable} from "rxjs";
import {ROLES_KEY} from "../decorators/roles.decorator";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService,private readonly reflector:Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const requiredRoles = this.reflector.get<string[]>(ROLES_KEY,context.getHandler());
            if(!requiredRoles) return true;

            const cntx = GqlExecutionContext.create(context).getContext();
            const [bearer,token] = cntx.headers.authorization.split(" ");
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message:"unauthorized"});
            }

            const user = this.jwtService.verify(token);
            console.log("user",user);
            return user.roles.some(role => requiredRoles.includes(role.value));
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }

}