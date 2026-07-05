// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
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
  const validEmail =
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validMessage =
    typeof message === "string" &&
    message.trim().length > 0 &&
    message.length <= 2000;

  if (!validEmail || !validMessage) {
    return res.status(400).json({ status: 400, message: "Email and message are required." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "ben@nerv.co.nz";
  if (!apiKey || !from) {
    return res.status(503).json({ status: 503, message: "Contact service is not configured." });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      to,
      from,
      replyTo: email,
      subject: "New nerv.co.nz contact",
      text: `From: ${email}\n\n${message.trim()}`,
    });

    if (error) {
      console.error("Contact form delivery failed", error.name);
      return res.status(502).json({ status: 502, message: "Message delivery failed." });
    }

    return res.status(200).json({ status: 200, message: "Form submitted." });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return res.status(502).json({ status: 502, message: "Message delivery failed." });
  }
}
