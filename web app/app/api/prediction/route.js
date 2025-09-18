import dbConnect from "../../lib/dbConnect";
import Prediction from "../../model/predictionModel";
import { NextResponse } from "next/server";

// POST -> Save prediction
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const newPrediction = new Prediction(body);
    await newPrediction.save();

    return NextResponse.json(
      { message: "Prediction saved", data: newPrediction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving prediction:", error);
    return NextResponse.json(
      { message: "Error saving prediction", error: error.message },
      { status: 500 }
    );
  }
}

// GET -> Fetch predictions by siteId
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

    const predictions = await Prediction.find({ siteId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { message: "Predictions fetched", data: predictions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return NextResponse.json(
      { message: "Error fetching predictions", error: error.message },
      { status: 500 }
    );
  }
}
