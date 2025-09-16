import dbConnect from '../../lib/dbConnect';
import Organization from '../../model/organisationModel';
import Site from '../../model/siteModel';
import Employee from '../../model/employeeModel';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(req) {
  await dbConnect();

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const body = await req.json();
    const { organizationData, siteData, employeeData } = body;

    // 1. Create Organization
    const [org] = await Organization.create([{ ...organizationData }], { session });

    // 2. Create Site linked to Organization
    const [site] = await Site.create(
      [{ ...siteData, organizationId: org._id }],
      { session }
    );

    // 3. Create Employee linked to Organization & Site
    const [emp] = await Employee.create(
      [{ ...employeeData, organizationId: org._id, linkedSites: [site._id] }],
      { session }
    );

    // 4. Update references
    org.sites.push(site._id);
    org.employees.push(emp._id);
    await org.save({ session });

    site.linkedEmployees.push(emp._id);
    await site.save({ session });

    // 5. Commit transaction
    await session.commitTransaction();

    return NextResponse.json(
      {
        message: 'Organization, site, and employee created successfully.',
        organization: { id: org._id, name: org.name },
        site: { id: site._id, name: site.name },
        employee: { id: emp._id, name: emp.name, email: emp.email },
      },
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction failed:', error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'A user or organization with this email already exists.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'An internal server error occurred.', error: error.message },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
