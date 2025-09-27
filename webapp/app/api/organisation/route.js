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

   
    const [org] = await Organization.create([{ ...organizationData }], { session });

    
    const [site] = await Site.create([{ ...siteData, organizationId: org._id }], { session });

    
    const [emp] = await Employee.create(
      [{ ...employeeData, organizationId: org._id, linkedSites: [site._id] }],
      { session }
    );

   
    org.sites.push(site._id);
    org.employees.push(emp._id);
    await org.save({ session });

    site.linkedEmployees.push(emp._id);
    await site.save({ session });

    
    await session.commitTransaction();

    return NextResponse.json(
      { message: 'Created successfully.', organization: org, site, employee: emp },
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction failed:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    session.endSession();
  }
}


export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    
    const organizationId = searchParams.get('organizationId') || searchParams.get('id');
    const siteId = searchParams.get('siteId');
    const employeeId = searchParams.get('employeeId');

    if (!organizationId || !siteId || !employeeId) {
      return NextResponse.json(
        { message: 'Missing required query params: organizationId (or id), siteId, employeeId' },
        { status: 400 }
      );
    }

   
    const org = await Organization.findById(organizationId).lean();
    const site = await Site.findById(siteId).lean();
    const emp = await Employee.findById(employeeId).lean();

    if (!org || !site || !emp) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json({
      organizationData: {
        _id: org._id,
        name: org.name,
        email: org.email,
        contact: org.contact,
        registeredAddress: org.registeredAddress,
        corporationIdentificationNumber: org.corporationIdentificationNumber,
        registrationType: org.registrationType,
      },
      siteData: {
        _id: site._id,
        name: site.name,
        location: site.location,
        coordinates: site.coordinates,
        businessProofLicense: site.businessProofLicense,
      },
      employeeData: {
        _id: emp._id,
        name: emp.name,
        email: emp.email,
        designation: emp.designation,
      },
    });
  } catch (error) {
    console.error('GET /organisation error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
