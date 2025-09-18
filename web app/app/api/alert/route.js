import dbConnect from "../../lib/dbConnect";
import Alert from "../../model/alertModel";
import Prediction from "../../model/predictionModel";
import { NextResponse } from "next/server";


export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { siteId, predictionId, level, message, sentTo } = body;

    if (!siteId || !predictionId || !level || !message) {
      return NextResponse.json(
        { message: "siteId, predictionId, level, and message are required" },
        { status: 400 }
      );
    }

    const newAlert = new Alert({
      siteId,
      predictionId,
      level,
      message,
      sentTo: sentTo || [],
    });

    await newAlert.save();

    return NextResponse.json(
      { message: "✅ Alert saved successfully", data: newAlert },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving alert:", error);
    return NextResponse.json(
      { message: "❌ Error saving alert", error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json(
        { message: "siteId query param required" },
        { status: 400 }
      );
    }

    const alerts = await Alert.find({ siteId })
      .populate("predictionId") 
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(
      { message: "📡 Alerts fetched successfully", data: alerts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json(
      { message: "❌ Error fetching alerts", error: error.message },
      { status: 500 }
    );
  }
}
