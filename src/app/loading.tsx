/**
 * Next.js shows this component automatically while a route's data is loading.
 * Picks up the branded ring-box animation.
 */
import RingBoxLoader from '@/components/RingBoxLoader';

export default function Loading() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <RingBoxLoader size={140} label="Loading" />
    </div>
  );
}
