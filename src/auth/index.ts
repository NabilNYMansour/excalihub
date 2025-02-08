export const CLERK_AVAILABLE = process.env.CLERK_WEBHOOK_SECRET !== 'no-clerk';

export const getCurrentUserId = async () : Promise<string | undefined> => {
  if (CLERK_AVAILABLE) {
    const { currentUser } = await import('@clerk/nextjs/server');
    const user = await currentUser();
    return user?.id;
  }
  return "no-clerk-id";
}

export const getCurrentUserFullName = async () : Promise<string | undefined> => {
  if (CLERK_AVAILABLE) {
    const { currentUser } = await import('@clerk/nextjs/server');
    const user = await currentUser();
    return user?.fullName ?? undefined;
  }
  return "no-clerk-name";
}