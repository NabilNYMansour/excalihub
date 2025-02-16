import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import * as db from '@/db/queries'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Update events
  await db.createEvent({ payload: JSON.stringify(evt), createAt: new Date().toISOString()});

  let clerkId: string;
  switch (evt.type) {
    case 'user.created':
      clerkId = evt.data.id;
      const email = JSON.parse(body).data.email_addresses[0].email_address;
      const name = (evt.data as UserJSON).first_name + ' ' + (evt.data as UserJSON).last_name;
      try {
        const userQuery = await db.getUserIdByClerkId(clerkId);
        if (userQuery.length === 0) {
          await db.createUser({ email: email, name: name, clerkId: clerkId, createAt: new Date().toISOString() });
        }
      } catch (err) {
        console.error('Error creating user:', err);
      }
      break;

    case 'user.deleted':
      clerkId = evt.data.id!;
      await db.deleteUserByClerkId(clerkId);
      break;
  }

  return new Response('', { status: 200 })
}