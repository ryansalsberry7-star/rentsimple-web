import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import crypto from "crypto";

function generateHash(pack: any) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(pack))
    .digest("hex");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const pack = req.body?.pack || req.body;

    const id = "RS-" + Date.now();
    const timestamp = Date.now();
    const hash = generateHash(pack);

    const report = { id, pack, timestamp, hash };

    await kv.set(`report:${id}`, report);

    return res.status(200).json({
      success: true,
      id,
      hash,
      verifyUrl: `https://rentsimple-web.vercel.app/verify/${id}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save report" });
  }
}
