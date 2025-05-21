import mongoose from "mongoose";

export const ParticipantSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model('Participant', ParticipantSchema);
