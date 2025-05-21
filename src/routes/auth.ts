import { Router, Request, Response } from "express";
import { Auth } from "../controllers/auth";

export const authRouter = Router();

const authController = new Auth();

authRouter.post("/login", async (req: Request, res: Response)=>{
    const tokens = await authController.login(req.body);

    res.status(200).json(tokens);
});
authRouter.post("/reg", async (req: Request, res: Response)=>{
    const tokens = await authController.reg(req.body);

    res.status(200).json(tokens);
});