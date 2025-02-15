export const CLERK_AVAILABLE = process.env.CLERK_WEBHOOK_SECRET !== 'no-clerk';
export const NO_CLERK_ID = "local-excalihub-id";
export const NO_CLERK_NAME = "ExcaliHub User";

export const getCurrentUserId = async () : Promise<string | undefined> => {
  if (CLERK_AVAILABLE) {
    const { currentUser } = await import('@clerk/nextjs/server');
    const user = await currentUser();
    return user?.id;
  }
  return NO_CLERK_ID;
}

export const getCurrentUserFullName = async () : Promise<string | undefined> => {
  if (CLERK_AVAILABLE) {
    const { currentUser } = await import('@clerk/nextjs/server');
    const user = await currentUser();
    return user?.fullName ?? undefined;
  }
  return NO_CLERK_NAME;
}