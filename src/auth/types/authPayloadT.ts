import {RoleEntity} from "../../entities/role.entity";
import {CompanyEntity} from "../../entities/company.entity";

export class authPayloadT{
    id:number;
    email:string;
    roles:RoleEntity[];
    name:string;
    phoneNumber:string;
}