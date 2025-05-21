import { NextFunction, Response } from "express";
import { Auth } from "../controllers/auth";
import { AuthRequest } from "../types";
import jwt from 'jsonwebtoken';

const authController = new Auth();

export const AuthMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];
    const refreshToken = req.headers["x-refresh-token"];
    try {
        if(!accessToken) throw new Error("Access token isn`t provided.");
        const id = jwt.verify(accessToken, process.env.ACCESS_SECRET!);
        req.id = id as string;
        return next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError" && refreshToken) {
        try {
            const result = authController.refresh(refreshToken as string); 
            const id = jwt.verify(result.accessToken, process.env.ACCESS_SECRET!);
            req.id = id as string;
            req.newAccessToken = result.accessToken;

            res.setHeader("x-access-token", result.accessToken);

            return next();
        } catch (refreshErr) {
            res.status(401).json({ error: "Refresh token invalid" });
        }
    }
        res.status(401).json({ error: "Unauthorized" });
    }
}