import { UserModel } from "../repositories/interfaces/IUserRepository";
import { RegisterResponseDto } from "../dtos/auth.dto";

export class AuthMapper {
    static toRegisterResponse(user: UserModel): RegisterResponseDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
