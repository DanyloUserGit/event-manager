import { Types } from "mongoose";
import Event from "../models/Event";
import Participant from "../models/Participant";
import { AddParticipant } from "../types";

export class Participants{
    constructor () {}

    async addParticipant(body:AddParticipant){
        try {
            const {eventId} = body;

            const eventExists = await Participant.findOne({...body});
            if (eventExists) throw new Error("The participant already exists.");

            const event = await Event.findById(new Types.ObjectId(eventId));
            const eventParticipantsNumber = await Participant.find({eventId}).countDocuments();
            if(!event) throw new Error("Event wasn`t found.");
            if (eventParticipantsNumber >= event.maxParticipants) throw new Error("The event reached its maxParticipants limit.");

            const participant = await Participant.create({...body});
            
            return participant;
        } catch (error) {
            throw error;
        }
    }
}