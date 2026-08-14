import { NextResponse } from "next/server";

type EnquiryPayload = {
  name?: string;
  email?: string;
  mobile?: string;
  org?: string;
  designation?: string;
  purpose?: string;
  mode?: string;
  date?: string;
  time?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: EnquiryPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const required: Array<keyof EnquiryPayload> = [
    "name",
    "email",
    "mobile",
    "org",
    "designation",
    "purpose",
    "mode",
    "date",
  ];

  const missing = required.filter(key => !String(body[key] ?? "").trim());
  if (missing.length) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
