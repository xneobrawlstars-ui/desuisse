/**
 * Lightweight session-check endpoint.
 * Returns 200 if the request carries a valid session cookie, 401 otherwise.
 * Used by the admin page to decide whether to show the login form or the
 * admin UI on initial load.
 */
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/session';

export async function GET(req: NextRequest) {
  if (!await authenticateRequest(req)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true }, { status: 200 });
}