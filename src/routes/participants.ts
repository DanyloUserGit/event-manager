import { Request, Response, Router } from "express";
import { Participants } from "../controllers/participants";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { AuthRequest } from "../types";

export const participantsRouter = Router();

const participantController = new Participants();

participantsRouter.post("/", AuthMiddleware, async (req: AuthRequest, res: Response)=>{
    const participant = await participantController.addParticipant(req.body);

    res.status(200).json(participant);
});