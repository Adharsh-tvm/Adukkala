import { GoogleLoginDto, RegisterDto, LoginDto, RegisterResponseDto, LoginResponseDto, GoogleLoginResponseDto } from "../../dtos/auth.dto";

export interface IAuthService {
    register(data: RegisterDto): Promise<RegisterResponseDto>;
    login(data: LoginDto): Promise<LoginResponseDto>;
    googleLogin(data: GoogleLoginDto): Promise<GoogleLoginResponseDto>;
}
