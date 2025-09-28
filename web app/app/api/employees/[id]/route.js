import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Employee from '../../../model/employeeModel';
import mongoose from 'mongoose';

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid employee ID.' }, { status: 400 });
  }
  
  try {
    await dbConnect();

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return NextResponse.json({ success: false, message: 'Employee not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Employee rejected and deleted successfully.',
    });
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return NextResponse.json(
      { success: false, message: 'Server error deleting employee.' },
      { status: 500 }
    );
  }
}