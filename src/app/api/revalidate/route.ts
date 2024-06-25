import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
export const GET = async (req: NextRequest) => {
  const secret = req.nextUrl.searchParams.get("secret")

  if (secret !== process.env.SECRET_TOKEN) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401, statusText: "unauthorized" },
    )
  }

  const path = req.nextUrl.searchParams.get("path") || "/"
  revalidatePath(path)

  return NextResponse.json({ message: "Revalidated" })
}
