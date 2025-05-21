import { config } from "dotenv";
import express from "express"
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";
import { eventsRouter } from "./routes/events";
import { participantsRouter } from "./routes/participants";
config();

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/events", eventsRouter);
app.use("/participants", participantsRouter);

app.listen(process.env.PORT ?? 8000, async ()=>{
    await mongoose.connect(process.env.MONGO_LINK!);

    console.log(`Server is running on port ${process.env.PORT ?? 8000}`);
});