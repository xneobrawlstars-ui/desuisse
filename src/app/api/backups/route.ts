/**
 * Backups API.
 *
 *   GET  /api/backups               → list all snapshots (admin-only)
 *   GET  /api/backups?id=ID         → download a specific snapshot as JSON
 *   POST /api/backups/restore       → restore a snapshot to live products
 *
 * All routes require a valid admin session.
 */
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/session';
import { listSnapshots, loadSnapshot } from '@/lib/backup';

export async function GET(req: NextRequest) {
  if (!await authenticateRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get('id');

  if (id) {
    // Download a specific snapshot
    if (!/^[a-zA-Z0-9-]+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid snapshot ID' }, { status: 400 });
    }
    const products = await loadSnapshot(id);
    if (!products) {
      return NextResponse.json({ error: 'Snapshot not found' }, { status: 404 });
    }
    return NextResponse.json(products, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Disposition': `attachment; filename="desuisse-products-${id}.json"`,
      },
    });
  }

  // List all snapshots
  const snapshots = await listSnapshots();
  return NextResponse.json(snapshots, {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}
