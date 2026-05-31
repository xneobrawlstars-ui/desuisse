/**
 * Wishlist sync for signed-in users.
 *
 *   GET  /api/auth/wishlist          → returns the user's wishlist array
 *   POST /api/auth/wishlist          → body { wishlist: string[] } replaces server copy
 *   POST /api/auth/wishlist?merge=1  → body { wishlist: string[] } merges into server copy
 *
 * The merge mode is used right after login: the customer might have a
 * local-storage wishlist from before signing in. We union the local and
 * server wishlists so nothing is lost.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/userSession';
import { getUserById, saveUser } from '@/lib/userStore';

const MAX_WISHLIST_ITEMS = 200;

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 });

  const user = await getUserById(userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ wishlist: user.wishlist || [] });
}

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 });

  let body: { wishlist?: unknown };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  if (!Array.isArray(body.wishlist)) {
    return NextResponse.json({ error: 'wishlist must be an array' }, { status: 400 });
  }

  // Sanitize: only allow strings that look like product IDs
  const incoming = (body.wishlist as unknown[])
    .filter(x => typeof x === 'string')
    .map(x => x as string)
    .filter(x => /^[a-zA-Z0-9_-]{1,128}$/.test(x))
    .slice(0, MAX_WISHLIST_ITEMS);

  const user = await getUserById(userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const merge = req.nextUrl.searchParams.get('merge') === '1';
  if (merge) {
    // Union of existing + incoming, deduplicated, capped at max
    const set = new Set([...(user.wishlist || []), ...incoming]);
    user.wishlist = Array.from(set).slice(0, MAX_WISHLIST_ITEMS);
  } else {
    user.wishlist = incoming;
  }

  const saved = await saveUser(user);
  if (!saved) return NextResponse.json({ error: 'Could not save' }, { status: 503 });

  return NextResponse.json({ wishlist: user.wishlist });
}
