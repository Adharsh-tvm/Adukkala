export interface GoogleUserPayload {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
}

export interface GoogleLoginInput {
    credential: string;
}