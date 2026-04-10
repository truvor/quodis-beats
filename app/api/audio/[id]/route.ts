import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { session } = {} } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("Unable to retrieve Supabase token from client");
  }

  console.log('process.env.BASE_URL', process.env.BASE_URL)

  const backendResponse = await fetch(new URL(`/audio/${id}`, process.env.CONTRACT_GENERATOR_URL), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!backendResponse.ok) {
    return new NextResponse("Failed to fetch audio", { status: backendResponse.status });
  }
  return new NextResponse(backendResponse.body, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline',
    },
  });
}