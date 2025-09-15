import dbConnect from '../../lib/dbConnect';
import Organization from '../../model/organisationModel'; // Corrected path
import Site from '../../model/siteModel'; // Corrected path
import Employee from '../../model/employeeModel'; // Corrected path
import { NextResponse } from 'next/server'; // Import NextResponse
import mongoose from 'mongoose';

// The request body structure from your previous example is assumed.
// It should be sent as a JSON payload from the client.

export async function POST(req) {
  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const body = await req.json(); // Use req.json() to parse the body
    const { organizationData, siteData, employeeData } = body;

    // 1. Create the Organization
    const newOrg = new Organization(organizationData);
    await newOrg.save({ session });

    // 2. Create the Site and link it to the Organization
    const newSite = new Site({
      ...siteData,
      organizationId: newOrg._id
    });
    await newSite.save({ session });

    // 3. Create the Employee and link to the Organization and Site
    // Password hashing should be handled by the pre-save hook in your Employee model
    const newEmployee = new Employee({
      ...employeeData,
      organizationId: newOrg._id,
      linkedSites: [newSite._id]
    });
    await newEmployee.save({ session });

    // 4. Update the Organization and Site with the new IDs
    newOrg.sites.push(newSite._id);
    newOrg.employees.push(newEmployee._id);
    await newOrg.save({ session });
    
    newSite.linkedEmployees.push(newEmployee._id);
    await newSite.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Success response using NextResponse
    return NextResponse.json({
      message: 'Organization, site, and employee created successfully.',
      organization: { id: newOrg._id, name: newOrg.name },
      site: { id: newSite._id, name: newSite.name },
      employee: { id: newEmployee._id, name: newEmployee.name, email: newEmployee.email }
    }, { status: 201 });

  } catch (error) {
    // Abort the transaction on any error
    await session.abortTransaction();
    session.endSession();

    console.error("Transaction failed:", error);

    // Provide a more user-friendly error message for common issues
    if (error.code === 11000) {
      return NextResponse.json({ message: 'A user or organization with this email already exists.' }, { status: 409 });
    }
    
    return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
  }
}