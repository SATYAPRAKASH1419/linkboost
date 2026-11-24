import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const rawNext = searchParams.get('next');
    // Sanitize redirect destination: must be a local relative path to avoid open redirects
    const safeNext = (rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//'))
        ? rawNext
        : '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            const { data: { user } } = await supabase.auth.getUser();
            const hasUsername = Boolean(user?.user_metadata?.username);
            const isOnboardingCompleted = Boolean(user?.user_metadata?.onboarding_completed);

            // If user came from signup flow OR hasn't completed onboarding, route to onboarding phases
            if (safeNext.includes('step=onboarding') || !hasUsername || !isOnboardingCompleted) {
                return NextResponse.redirect(`${origin}/signup?step=onboarding&oauth=true`);
            }

            return NextResponse.redirect(`${origin}${safeNext}`);
        }
    }

    // If code exchange fails, send them to login with an error message
    return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}