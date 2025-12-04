import { clerkMiddleware } from "@clerk/nextjs/server";

const botBlocklist = [
  /DigitalOcean Uptime Probe/i, // your current culprit
  // add more if needed:
  // /Slackbot/i, /Discordbot/i, /Twitterbot/i, /facebookexternalhit/i,
];

function isBlockedBot(ua: string) {
  return botBlocklist.some((re) => re.test(ua));
}

export default function middleware(req: Request) {
  const ua = req.headers.get("user-agent") || "";

  // Cheap 204 for blocked bots; cached so repeated hits are free
  if (isBlockedBot(ua)) {
    return new Response("", {
      status: 204,
      headers: { "Cache-Control": "public, s-maxage=3600" },
    });
  }

  // Fall through to Clerk’s middleware for real users
  // @ts-expect-error Clerk expects NextRequest but Request works at runtime
  return clerkMiddleware()(req as any);
}

// Same matcher you had
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};