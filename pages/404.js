import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function NotFoundPage() {
  const searchParams = useSearchParams();
  // ...existing code...
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundPage />
      </Suspense>
    </Suspense>
  );
}
