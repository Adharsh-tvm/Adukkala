import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (
    userId: string,
    name: string
): string => {
    return jwt.sign(
        { userId, name },
        JWT_SECRET,
        {
            expiresIn: process.env.MAX_TOKEN_AGE as jwt.SignOptions["expiresIn"]
        }
    );
};

export const verifyToken = (
    token: string
): jwt.JwtPayload => {
    return jwt.verify(
        token,
        JWT_SECRET
    ) as jwt.JwtPayload;
};