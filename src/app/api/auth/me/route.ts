/**
 * GET /api/auth/me
 *
 * Returns the current signed-in user's public info, or 401 if not signed in.
 * Used by the client to determine "is the customer logged in?" on page load.
 *
 * Public info only: never returns passwordHash or other secrets.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/userSession';
import { getUserById } from '@/lib/userStore';

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
    wishlist: user.wishlist,
  });
}
