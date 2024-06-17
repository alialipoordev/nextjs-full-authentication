import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";

interface UserToken {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { token } = req.body;
    const { ACTIVATION_TOKEN_SECRET } = process.env;

    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as UserToken;

    const user = await User.findById(userToken.id);

    if (!user)
      return res.status(400).json({ message: "This account no longer exist." });

    if (user.emailVerified == true)
      return res
        .status(400)
        .json({ message: "Email address already verified." });

    await User.findByIdAndUpdate(user.id, { emailVerified: true });

    res.json({ message: "Your account has been successfully verified." });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
