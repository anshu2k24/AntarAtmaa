import { NextResponse } from "next/server";
import { sendAlertEmail } from "../../services/email"; // adjust path if needed
import dbConnect from "../../lib/dbConnect";
import Alert from "../../model/alertModel";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { siteId, prediction, level } = body;

    // 1. send the email
    await sendAlertEmail({
      siteId,
      prediction,
      level,
    });

    // 2. save the alert in DB
    const newAlert = new Alert({
      siteId,
      predictionId: prediction._id, // ⏪ assumes you’re passing the prediction doc from DB
      level,
      message: `Rockfall risk detected: ${level}`,
      sentTo: [process.env.ALERT_EMAIL || "ops@site.com"], // adjust as needed
    });
    await newAlert.save();

    return NextResponse.json(
      { message: "Alert email sent + saved", data: newAlert },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in notify API:", error);
    return NextResponse.json(
      { message: "Failed to send/save alert", error: error.message },
      { status: 500 }
    );
  }
}
