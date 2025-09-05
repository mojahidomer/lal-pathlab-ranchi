import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/db';
import LabTest from '@/dbModels/LabTest/LabTest';
import generateTestId from '@/utils/generateTestId';
import { requireAuth } from '@/lib/requireAuth';
import { corsMiddleware } from '@/lib/cors';
import { checkRateLimit } from '@/lib/rateLimit';

export async function GET(request: NextRequest) {
  try {
    const corsResponse = corsMiddleware(request);
    if (corsResponse.status === 403) return corsResponse;
    const rateLimitResponse = await checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const fastingRequired = searchParams.get('fastingRequired');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let query: any = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { testId: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by fasting requirement
    if (fastingRequired !== null && fastingRequired !== undefined) {
      query.fastingRequired = fastingRequired === 'true';
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const labTests = await (await LabTest.find(query)
      .populate('includedTests', 'name price')
      .sort({ createdAt: -1 }).lean<{ _id: string, includedTests: { _id: string }[] }[]>()).map(doc => ({
        ...doc,
        id: doc._id.toString(),
        includedTests: (doc.includedTests || []).map(({ _id }) => _id.toString())
      }))
    return NextResponse.json({
      success: true,
      data: labTests
    });
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lab tests' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (!auth.success) return auth.response;

    await connectDB();

    const body = await request.json();
    const {
      id,
      name,
      description,
      price,
      discount = 0,
      fastingRequired,
      duration,
      includedTests = [],
      isGroupedTest = false,
      sampleType = 'blood',
      category,
      instructions,
      reportAvailability,
      isActive = true,
      isDeleted = false,
      testUses = 'Lab Test', // Default value for TestUses
      method = 'Lab Test', // Default value for method,
      testId = await generateTestId()
    } = body;

    // Validate required fields
    if (!id || !name || !description || price === undefined || fastingRequired === undefined || !duration) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Check if a test with the same ID already exists
    const existingTest = await LabTest.findOne({ testId: id });
    if (existingTest) {
      return NextResponse.json(
        { success: false, error: 'Test with this ID already exists' },
        { status: 409 }
      );
    }

    const labTest = new LabTest({
      testId,
      name,
      description,
      price: parseFloat(price),
      discount: parseFloat(discount),
      fastingRequired: Boolean(fastingRequired),
      duration,
      includedTests,
      isGroupedTest,
      sampleType,
      category,
      instructions,
      reportAvailability,
      isActive,
      isDeleted,
      testUses,
      method,
      // createdBy / updatedBy can be set here if available via auth
    });

    await labTest.save();

    // Populate includedTests for response
    await labTest.populate('includedTests', 'name price');

    return NextResponse.json(
      { success: true, data: labTest },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating lab test:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lab test' },
      { status: 500 }
    );
  }
}