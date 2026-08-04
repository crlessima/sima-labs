import { NextResponse } from "next/server";
import { generateTestCases } from "@/modules/testcases/services/generateTestCases";

export async function POST(req: Request) {
  const { text } = await req.json();

  const output = await generateTestCases(text);

  return NextResponse.json({ output });
}
