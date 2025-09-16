import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/dbConnect';
import Employee from '../../model/employeeModel';

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find employee with organization + linked sites populated
    const employee = await Employee.findOne({ email })
      .populate('organizationId')
      .populate('linkedSites');

    if (!employee) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Grab the first site ID (if exists)
    const siteId = employee.linkedSites?.length > 0 ? employee.linkedSites[0]._id : null;

    return NextResponse.json(
      {
        message: 'Login successful',
        employeeId: employee._id,
        organizationId: employee.organizationId?._id || null,
        siteId, // ✅ first site from linkedSites
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
