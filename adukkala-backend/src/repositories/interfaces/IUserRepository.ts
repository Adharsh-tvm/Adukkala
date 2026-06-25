// Domain model — independent of any ORM or database driver
export interface UserModel {
    id: string;
    name: string;
    email: string;
    password: string | null;
    googleId: string | null;
    profileImage: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserData {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    profileImage?: string;
}

export interface UpdateGoogleData {
    googleId: string;
    profileImage?: string;
}

export interface IUserRepository {
    findByEmail(email: string): Promise<UserModel | null>;
    create(data: CreateUserData): Promise<UserModel>;
    updateGoogleData(id: string, data: UpdateGoogleData): Promise<UserModel>;
}
