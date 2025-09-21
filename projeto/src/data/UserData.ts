import { users } from "../bd";

export class UserData {
    buscarUsuarioPorEmail = (email: string) => {
        try {
            const userFound = users.filter((user)=>{
                return user.email == email;
            }) 
            return userFound;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}