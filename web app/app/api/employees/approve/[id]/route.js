import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Employee from '../../../../model/employeeModel';
import Admin from '../../../../model/adminModel';
import mongoose from 'mongoose';

export async function PATCH(request, { params }) {
  const { id: employeeId } = params;
  const { adminId } = await request.json();

  if (!mongoose.Types.ObjectId.isValid(employeeId) || !mongoose.Types.ObjectId.isValid(adminId)) {
    return NextResponse.json({ success: false, message: 'Invalid ID format.' }, { status: 400 });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { isApproved: true, approvedBy: adminId },
      { new: true, session }
    );

    if (!employee) {
      throw new Error('Employee not found.');
    }

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { $addToSet: { approvedEmployees: employeeId } },
      { new: true, session }
    );

    if (!admin) {
      throw new Error('Admin not found.');
    }
    
    await session.commitTransaction();
    
    return NextResponse.json({
      success: true,
      message: 'Employee approved and records updated.',
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Approval transaction failed:", error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error during approval.' },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}