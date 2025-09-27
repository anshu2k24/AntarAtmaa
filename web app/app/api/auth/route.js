import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/dbConnect';
import Employee from '../../model/employeeModel';
import Admin from '../../model/adminModel'; 

// 👇 ADD THESE TWO LINES
import Organization from '../../model/organisationModel'; 
import Site from '../../model/siteModel'; 

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // This query will now work because Organization and Site models are registered
    let user = await Employee.findOne({ email })
      .populate('organizationId')
      .populate('linkedSites');

    if (user) {
      if (!user.isApproved) {
        return NextResponse.json(
          { message: 'Your account is pending approval.' },
          { status: 403 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const siteId =
        user.linkedSites?.length > 0 ? user.linkedSites[0]._id : null;

      return NextResponse.json({
        message: 'Login successful',
        role: 'employee',
        employeeId: user._id,
        organizationId: user.organizationId?._id || null,
        siteId,
      }, { status: 200 });
    }

    user = await Admin.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
      
      return NextResponse.json({
        message: 'Login successful',
        role: 'admin',
        adminId: user._id,
      }, { status: 200 });
    }
    
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}