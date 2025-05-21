import mongoose from "mongoose";

export const ParticipantSchema = new mongoose.Schema({
  eventId: { type: String, required: true, ref:"Event" },
  userId: { type: String, required: true, ref:"User" },
});

export default mongoose.model('Participant', ParticipantSchema);
