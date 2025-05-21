import { Router, Request, Response } from "express";
import { Events } from "../controllers/events";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { AuthRequest } from "../types";

export const eventsRouter = Router();

const eventController = new Events();

eventsRouter.post("/", AuthMiddleware, async (req: Request, res:Response)=>{
    const event = await eventController.addEvent(req.body);
    res.status(200).json(event);
});
eventsRouter.get("/", AuthMiddleware, async (req: AuthRequest, res:Response)=>{
    const events = await eventController.getEvents(req.id!);
    res.status(200).json(events);
});
eventsRouter.get("/:id", AuthMiddleware, async (req: Request, res:Response)=>{
    const event = await eventController.getEvent(req.params.id);
    res.status(200).json(event);
});
eventsRouter.put("/:id", AuthMiddleware, async (req: Request, res:Response)=>{
    await eventController.editEvent(req.body, req.params.id);
    res.status(200);
});
eventsRouter.delete("/:id", AuthMiddleware, async (req: Request, res:Response)=>{
    await eventController.deleteEvent(req.params.id);
    res.status(200);
});