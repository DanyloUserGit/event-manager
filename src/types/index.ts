import { Request } from "express";

export interface LoginBody{
    email:string;
    password:string;
}
export interface RegBody{
    username:string;
    email:string;
    password:string;
}
export interface AddEvent{
    name: string,
    description: string,
    location: string,
    maxParticipants: number,
    date: Date
}
export interface AddParticipant{
    eventId:string;
    userId:string;
}
export interface AuthRequest extends Request{
    id?:string;
    newAccessToken?:string;
}