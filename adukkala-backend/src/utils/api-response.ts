import { MESSAGES } from "../shared/constants/message.constants";

export class ApiResponse<T = any> {
    public success: boolean;
    public message: string;
    public data?: T;

    constructor(success: boolean, message: string, data?: T) {
        this.success = success;
        this.message = message;
        if (data !== undefined) {
            this.data = data;
        }
    }

    static success<T>(data?: T, message: string = MESSAGES.COMMON.SUCCESS): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data);
    }

    static error<T = null>(message: string = MESSAGES.COMMON.SERVER_ERROR, data?: T): ApiResponse<T> {
        return new ApiResponse<T>(false, message, data);
    }
}
