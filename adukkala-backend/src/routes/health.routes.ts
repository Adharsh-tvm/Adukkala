import { Router } from "express";
import { HTTP_STATUS } from "../shared/constants/http-status.constants";
import { ApiResponse } from "../utils/api-response";

const router = Router();

router.get("/", (req, res) => {
    res.status(HTTP_STATUS.OK).json(
        ApiResponse.success(null, "API Working")
    );
});

export default router;