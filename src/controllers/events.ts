import { Types } from "mongoose";
import Event from "../models/Event";
import { AddEvent } from "../types";

export class Events{
    constructor () {}

    async addEvent(body: AddEvent){
        try {
            const eventExists = await Event.findOne({...body});
            if(eventExists) throw new Error("Event already exist");

            const event = await Event.create(body);
            return event;
        } catch (error) {
            throw error;
        }
    }
    async getEvents(){
        try {
            const events = await Event.find();
            return events;
        } catch (error) {
            throw error;
        }
    }
    async getEvent(id:string){
        try {
            const event = await Event.findById(new Types.ObjectId(id));
            return event;
        } catch (error) {
            throw error;
        }
    }
    async editEvent(body:AddEvent, id:string){
        try {
            const event = await Event.findByIdAndUpdate(new Types.ObjectId(id), {...body});
            return event;
        } catch (error) {
            throw error;
        }
    }
    async deleteEvent(id:string){
        try {
            const event = await Event.findByIdAndDelete(new Types.ObjectId(id));
            return event;
        } catch (error) {
            throw error;
        }
    }
}