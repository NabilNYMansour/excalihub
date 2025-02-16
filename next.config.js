module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_ZGVsaWNhdGUtd3Jlbi02Ni5jbGVyay5hY2NvdW50cy5kZXYk",
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "no-clerk",
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET || "no-clerk",
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
  }
}