/**
 * Activity log.
 * GET /api/activity-log — returns recent admin actions, newest first.
 * Admin-only.
 */
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/session';
import { getActivity } from '@/lib/backup';

export async function GET(req: NextRequest) {
  if (!await authenticateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const entries = await getActivity();
  return NextResponse.json(entries, {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}
