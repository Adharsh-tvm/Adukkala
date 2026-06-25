export interface GoogleUserPayload {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
}

export interface GoogleLoginInput {
    credential: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}