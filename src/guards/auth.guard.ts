import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const cntx = GqlExecutionContext.create(context).getContext();
            const [bearer,token] = cntx.headers.authorization.split(" ");
            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message:"unathorized"});
            }
            return true;
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }
}