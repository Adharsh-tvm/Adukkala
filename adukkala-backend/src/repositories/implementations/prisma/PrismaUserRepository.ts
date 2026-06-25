import { prisma } from "../../../prisma/prisma";
import {
    IUserRepository,
    UserModel,
    CreateUserData,
    UpdateGoogleData,
} from "../../interfaces/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
    findByEmail(email: string): Promise<UserModel | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    create(data: CreateUserData): Promise<UserModel> {
        return prisma.user.create({ data });
    }

    updateGoogleData(id: string, data: UpdateGoogleData): Promise<UserModel> {
        return prisma.user.update({ where: { id }, data });
    }
}
