import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
 return NextResponse.json({message:"ok"},{status:200});
}
