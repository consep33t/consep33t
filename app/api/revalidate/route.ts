import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Optional security check if secret is set in env
  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  try {
    // Revalidate tag and paths
    // @ts-ignore
    revalidateTag("github-repos");
    revalidatePath("/", "layout");
    revalidatePath("/projects", "page");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: "GitHub repos cache cleared successfully!"
    });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
