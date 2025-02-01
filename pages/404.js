import React, { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundPage />
      </Suspense>
    </Suspense>
  );
}
