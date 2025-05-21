import mongoose from "mongoose";

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  date: { type: Date, required: true}
});

export default mongoose.model('Event', EventSchema);
