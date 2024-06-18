import { resetPasswordEmail } from "@/email/templates/reset";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import sendMail from "@/utils/sendMail";
import { createResetToken } from "@/utils/tokens";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "This email does not exist." });

    const userId = createResetToken({
      id: user._id.toString(),
    });

    const url = `${process.env.NEXTAUTH_URL}/reset/${userId}`;

    await sendMail(
      email,
      user.name,
      user.image,
      url,
      "Reset your password",
      resetPasswordEmail
    );

    res.json({
      message: "An email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
