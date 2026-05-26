import { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Montserrat',color:'#999',fontSize:14}}>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
