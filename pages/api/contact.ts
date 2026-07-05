// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
type Data = {
  status: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ status: 405, message: "Method not allowed." });
  }

  const { email, msg: message } = req.body ?? {};
  if (typeof email !== "string" || typeof message !== "string" || !email || !message) {
    return res.status(400).json({ status: 400, message: "Email and message are required." });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@nerv.co.nz";
  if (!apiKey || !from) {
    return res.status(503).json({ status: 503, message: "Contact service is not configured." });
  }

  sgMail.setApiKey(apiKey);
  const mail = {
    to,
    from,
    replyTo: email,
    subject: "New form submission",
    text: `From: ${email}\n\n${message}`,
  };

  try {
    await sgMail.send(mail);
    return res.status(200).json({ status: 200, message: "Form submitted." });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return res.status(502).json({ status: 502, message: "Message delivery failed." });
  }
}
