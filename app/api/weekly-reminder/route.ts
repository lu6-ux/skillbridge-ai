import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    subject: "Weekly career coach",
    message: "This week, focus on one skill: React, SQL, or communication. Practice one project and update your portfolio.",
  });
}
