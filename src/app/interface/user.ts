import { Role } from "../../module/User/user.interface";

export type VerifiedUser = {
   email: string;
   role: Role;
   iat: number;
   exp: number;
};
