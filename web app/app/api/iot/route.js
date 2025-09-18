import dbConnect from '../../lib/dbConnect';
import SensorData from '../../model/sensorDataModel';
import Site from '../../model/siteModel';
import { NextResponse } from 'next/server';

// Route to add new sensor data
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { siteId, temperature, rainfall, soil_moisture, vib_rms, porepressure, displacement } = body;

    // Validate the existence of the associated site
    const siteExists = await Site.findById(siteId);
    if (!siteExists) {
      return NextResponse.json({ message: 'Site not found.' }, { status: 404 });
    }

    // Create a new sensor data document
    const newSensorData = new SensorData({
      siteId,
      temperature,
      rainfall,
      soil_moisture,
      vib_rms,
      porepressure,
      displacement,
    });

    await newSensorData.save();

    return NextResponse.json({
      message: 'Sensor data added successfully.',
      data: newSensorData
    }, { status: 201 });

  } catch (error) {
    console.error("Failed to add sensor data:", error);
    return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
  }
}

// Route to fetch sensor data for a specific site
export async function GET(req) {
  await dbConnect();

  try {
    // Extract siteId from the query parameters
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get('siteId');

    if (!siteId) {
      return NextResponse.json({ message: 'Site ID is required.' }, { status: 400 });
    }

    // Find all sensor data documents associated with the siteId
    const sensorData = await SensorData.find({ siteId }).sort({ timestamp: -1 });

    if (!sensorData || sensorData.length === 0) {
      return NextResponse.json({ message: 'No sensor data found for this site.' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Sensor data fetched successfully.',
      data: sensorData
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch sensor data:", error);
    return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
  }
}