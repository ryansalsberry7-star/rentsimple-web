export const runtime = "nodejs";

import { kv } from "@vercel/kv"; // 👈 THIS LINE MUST EXIST
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// 🔐 HASH FUNCTION
function generateHash(pack: any) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(pack))
    .digest("hex");
}

// 📤 CREATE REPORT (BACKEND GENERATES ID)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const pack = body.pack || body;

    // ✅ BACKEND CREATES ID
    const id = "RS-" + Date.now();
    const timestamp = Date.now();

    const hash = generateHash(pack);

    const report = {
      id,
      pack,
      timestamp,
      hash,
    };

    await kv.set(`report:${id}`, report);

    return NextResponse.json({
      success: true,
      id,
      verifyUrl: `https://rentsimple-web.vercel.app/api/verify/${id}`,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}