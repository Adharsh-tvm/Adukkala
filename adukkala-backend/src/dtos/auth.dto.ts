export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface GoogleLoginDto {
    credential: string;
}

export interface RegisterResponseDto {
    id: string;
    name: string;
    email: string;
}

export interface LoginResponseDto {
    token: string;
}

export interface GoogleLoginResponseDto {
    token: string;
}
