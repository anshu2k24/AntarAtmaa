import { NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect'; // Assuming you have a dbConnect utility
import Admin from '../../model/adminModel'; // Adjust the path to your admin model

export async function POST(request) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Parse the request body
    const { email, password } = await request.json();

    // 3. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }
    
    // 4. Check if an admin with this email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'An admin with this email already exists.' },
        { status: 409 } // 409 Conflict
      );
    }

    // 5. Create a new admin instance
    // The password will be hashed automatically by the 'pre-save' hook in your schema
    const newAdmin = new Admin({
      email,
      password,
    });

    // 6. Save the new admin to the database
    const savedAdmin = await newAdmin.save();
    
    // For security, don't send the password back in the response
    const adminResponse = {
        _id: savedAdmin._id,
        email: savedAdmin.email,
        createdAt: savedAdmin.createdAt,
    };

    // 7. Return a success response
    return NextResponse.json(
      {
        success: true,
        message: 'Admin created successfully.',
        data: adminResponse,
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.error('Error creating admin:', error); // Log the error for debugging
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}