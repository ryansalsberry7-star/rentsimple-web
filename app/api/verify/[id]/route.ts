import { kv } from "@vercel/kv";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// 🔐 HASH FUNCTION
function generateHash(pack: any) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(pack))
    .digest("hex");
}

// 📥 GET REPORT
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "No ID provided" },
        { status: 400 }
      );
    }

    const key = `report:${id}`;

    const report = (await kv.get(key)) as {
      id: string;
      pack: any;
      timestamp: number;
      hash: string;
    } | null;

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    const recomputedHash = generateHash(report.pack);
    const verified = recomputedHash === report.hash;

    return NextResponse.json({
      id: report.id,
      pack: report.pack,
      timestamp: report.timestamp,
      hash: report.hash,
      verified,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

// 📤 CREATE REPORT
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { id, pack, timestamp } = body;

    if (!id || !pack) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const key = `report:${id}`;

    const existing = await kv.get(key);
    if (existing) {
      return NextResponse.json(
        { error: "Report already exists and is immutable" },
        { status: 409 }
      );
    }

    const hash = generateHash(pack);

    const report = {
      id,
      pack,
      timestamp: timestamp || Date.now(),
      hash,
    };

    await kv.set(key, report);

    return NextResponse.json({
      success: true,
      id,
      hash,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}