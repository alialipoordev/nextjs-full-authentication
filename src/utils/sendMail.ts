import nodemailer from "nodemailer";
import Handlebars from "handlebars";

export default async function sendMail(
  to: string,
  name: string,
  image: string,
  url: string,
  subject: string,
  template: string
) {
  const {
    MAILING_EMAIL,
    MAILING_PASSWORD,
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_PORT,
  } = process.env;

  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
    },

    // port: Number(SMTP_PORT),
    // host: SMTP_HOST,
    // auth: {
    //   user: SMTP_EMAIL,
    //   pass: SMTP_PASSWORD,
    // },
  });

  //---HTML replacement---
  const data = Handlebars.compile(template);
  const replacements = {
    name,
    image,
    email_link: url,
  };
  const html = data(replacements);
  //---verify connection config---
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("server is listening...");
        resolve(success);
      }
    });
  });
  //---send email---
  const options = {
    from: MAILING_EMAIL,
    to,
    subject,
    html,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
