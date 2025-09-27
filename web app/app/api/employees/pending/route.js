import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Adjust path to your dbConnect utility
import Employee from '../../../model/employeeModel'; // Adjust path to your model

export async function GET() {
  try {
    await dbConnect();

    // Find all employees where 'isApproved' is false
    const pendingEmployees = await Employee.find({ isApproved: false }).select(
      '-password' // Exclude the password from the response
    );

    return NextResponse.json({
      success: true,
      data: pendingEmployees,
    });
  } catch (error) {
    console.error("Failed to fetch pending employees:", error);
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}