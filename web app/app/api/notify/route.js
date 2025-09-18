import { NextResponse } from "next/server";
import { sendAlertEmail } from "../../services/email";
import dbConnect from "../../lib/dbConnect";
import Alert from "../../model/alertModel";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { siteId, prediction, level } = body;

    // 1. Only notify for Medium/High
    if (!["Medium", "High"].includes(level)) {
      return NextResponse.json(
        { message: "Low/Critical alert ignored for email" },
        { status: 200 }
      );
    }

    // 2. Find the last alert for this site
    const lastAlert = await Alert.findOne({ siteId })
      .sort({ createdAt: -1 })
      .lean();

    const now = new Date();

    if (lastAlert) {
      const diffMs = now - new Date(lastAlert.createdAt);
      const diffMins = diffMs / 1000 / 60;

      // 2a. Cooldown: block if < 1 min since last alert
      if (diffMins < 1) {
        return NextResponse.json(
          { message: "Skipped due to cooldown" },
          { status: 200 }
        );
      }

      // 2b. Redundancy: skip if same risk + unchanged probs within 10 min
      if (
        lastAlert.level === level &&
        diffMins < 10 &&
        JSON.stringify(prediction.rockfall_probabilities) ===
          JSON.stringify(lastAlert.predictionId?.rockfall_probabilities)
      ) {
        return NextResponse.json(
          { message: "Skipped due to redundancy" },
          { status: 200 }
        );
      }
    }

    // 3. Send email
    await sendAlertEmail({ siteId, prediction, level });

    // 4. Save alert in DB
    const newAlert = new Alert({
      siteId,
      predictionId: prediction._id,
      level,
      message: `Rockfall risk detected: ${level}`,
      sentTo: [process.env.ALERT_EMAIL || "ops@site.com"],
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
