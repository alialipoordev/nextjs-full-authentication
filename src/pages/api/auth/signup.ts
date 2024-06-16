// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { activateTemplateEmail } from "@/email/templates/activate";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import sendMail from "@/utils/sendMail";
import { createActivationToken } from "@/utils/tokens";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const { first_name, last_name, email, phone, password } = req.body;

    if (!first_name || !last_name || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please Add a valid phone number." });
    }

    if (!validator.isMobilePhone(phone)) {
      return res
        .status(400)
        .json({ message: "Please Add a valid phone number." });
    }

    const user = await User.findOne({
      email,
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "This email address already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const encryptedPassword = await hash(password, 12);

    const newUser = new User({
      name: `${first_name} ${last_name}`,
      email,
      phone,
      password: encryptedPassword,
    });

    await newUser.save();

    const activation_token = createActivationToken({
      id: newUser._id.toString(),
    });

    const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;

    await sendMail(
      newUser.email,
      newUser.name,
      "",
      url,
      "Activate your account",
      activateTemplateEmail
    );

    res.json({
      message: "Register success! Please activate your account to start.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
