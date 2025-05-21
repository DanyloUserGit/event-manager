import User from "../models/User";
import { LoginBody, RegBody } from "../types";
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class Auth {
  constructor() {}

  async login(body: LoginBody) {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) throw new Error("User doesn't exist");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    const tokens = this.generateTokens({ id: user._id, email: user.email });

    return tokens;
  }

  async reg(body: RegBody) {
    const { email, password } = body;
    const userExists = await User.findOne({ email });

    if (userExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...body, password: hashedPassword });

    const tokens = this.generateTokens({ id: user._id, email: user.email });

    return tokens;
  }
    refresh(refreshToken: string) {
        try {
        const token = jwt.verify(refreshToken, process.env.REFRESH_SECRET!);
        const accessToken = jwt.sign(
            { id: (token as any).id, email: (token as any).email },
            process.env.ACCESS_SECRET!,
            { expiresIn: 900 }
        );
        return { accessToken };
        } catch (err) {
        throw new Error("Invalid refresh token");
        }
    }

  private generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET!, {
      expiresIn:900
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET!, {
      expiresIn:3600*24*3
    });

    return { accessToken, refreshToken };
  }
}