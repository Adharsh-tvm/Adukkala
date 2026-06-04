import { ApiResponse } from "@/types/api.types";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/auth.types";
import { api } from "./api/client";
import { ENDPOINTS } from "./api/endpoints";

export const authService = {

    async login(
        payload: LoginRequest
    ): Promise<ApiResponse<LoginResponse>> {
        const { data } = await api.post<
            ApiResponse<LoginResponse>
        >(
            ENDPOINTS.AUTH.LOGIN,
            payload
        );
        return data;
    },

    async register(
        payload: RegisterRequest
    ) {
        const { data } = await api.post(
            ENDPOINTS.AUTH.REGISTER,
            payload
        );

        return data;
    },
}