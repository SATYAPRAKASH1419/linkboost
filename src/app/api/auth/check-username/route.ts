import { createClient } from "@/lib/supabase/server";
import { validateUsername } from "@/lib/validation/authValidation";
import { NextResponse } from "next/server";

// Block reserved keywords from being claimed as vanity URLs
export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "app",
  "auth",
  "dashboard",
  "explore",
  "help",
  "login",
  "logout",
  "pricing",
  "privacy",
  "settings",
  "signup",
  "terms",
  "u",
  "user",
]);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawUserName = searchParams.get("username");

    if (!rawUserName) {
      return NextResponse.json(
        { available: false, error: "Username is required" },
        { status: 400 },
      );
    }

    const username = rawUserName.toLocaleLowerCase().trim();
    const validationError = validateUsername(username);
    if (validationError) {
      return NextResponse.json(
        { available: false, error: validationError },
        { status: 200 },
      );
    }

    if (RESERVED_SLUGS.has(username)) {
      return NextResponse.json(
        {
          available: false,
          error: "This handle is reserved. Please pick another.",
        },
        { status: 200 },
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.log("Supabase username check error:", error);
      return NextResponse.json(
        { available: false, error: "Failed to verify handle availability" },
        { status: 500 },
      );
    }
    const isTaken = Boolean(data?.username);
    return NextResponse.json(
      {
        available: !isTaken,
        username,
        error: isTaken ? "This handle is already taken" : null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected check-username error:", error);
    return NextResponse.json(
      { available: false, error: "Server error checking username" },
      { status: 500 },
    );
  }
}
