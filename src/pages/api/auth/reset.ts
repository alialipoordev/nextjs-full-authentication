import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { hash } from "bcryptjs";

interface UserToken {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { token,password } = req.body;
    const { RESET_TOKEN_SECRET } = process.env;

    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as UserToken;

    const user = await User.findById(userToken.id);

    if (!user)
      return res.status(400).json({ message: "This account no longer exist." });

    const encryptedPassword = await hash(password, 12)

    await User.findByIdAndUpdate(user.id, { password: encryptedPassword });

    res.json({ message: "Your account password has been successfully updated." });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
