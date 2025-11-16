import { NextResponse } from "next/server";
export async function POST(request: Request) {
    await new Promise( res => setTimeout(res, 1200)); // Simulate delay
    const body = await request.json();
    const { name }  = body

    // server side validation
    if(!name || name.trim() === "") {
        return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    if(name.trim().length < 3) {
        return NextResponse.json({ message: "Name must be at least 3 characters long" }, { status: 400 });
    }
  return NextResponse.json({ message: `Hello ${name} , server validated your input successfully` });
}