import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {GqlExecutionContext} from "@nestjs/graphql";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class CompanyCreatorGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const cntx = GqlExecutionContext.create(context).getContext();
            const [bearer,token] = cntx.headers.authorization.split(" ");
            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message:"unathorized"});
            }
            const user = this.jwtService.verify(token);

            // return !!user?.companies?.length;
            return true;
        }catch (err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}